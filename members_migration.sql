-- members_migration.sql
-- Supabase 회원 데이터 마이그레이션 스크립트
-- 생성일: 2025-01-15

-- 기존 테이블이 있다면 삭제
DROP TABLE IF EXISTS public.members;

-- 회원 테이블 생성
CREATE TABLE public.members (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    mb_no INTEGER NOT NULL,
    mb_id VARCHAR(20) UNIQUE NOT NULL,
    mb_password VARCHAR(255) NOT NULL,
    mb_name VARCHAR(255) NOT NULL,
    mb_nick VARCHAR(255) NOT NULL,
    mb_nick_date DATE,
    mb_email VARCHAR(255) NOT NULL,
    mb_homepage VARCHAR(255),
    mb_level INTEGER DEFAULT 1,
    mb_sex VARCHAR(1),
    mb_birth VARCHAR(255),
    mb_tel VARCHAR(255),
    mb_hp VARCHAR(255),
    mb_certify VARCHAR(20),
    mb_adult BOOLEAN DEFAULT false,
    mb_dupinfo VARCHAR(255),
    mb_zip VARCHAR(7),
    mb_addr1 VARCHAR(255),
    mb_addr2 VARCHAR(255),
    mb_addr3 VARCHAR(255),
    mb_addr_jibeon VARCHAR(255),
    mb_signature TEXT,
    mb_recommend VARCHAR(255),
    mb_point INTEGER DEFAULT 0,
    mb_today_login TIMESTAMP WITH TIME ZONE,
    mb_login_ip VARCHAR(45),
    mb_datetime TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    mb_ip VARCHAR(45),
    mb_leave_date VARCHAR(8),
    mb_intercept_date VARCHAR(8),
    mb_email_certify TIMESTAMP WITH TIME ZONE,
    mb_email_certify2 VARCHAR(255),
    mb_memo TEXT,
    mb_lost_certify VARCHAR(255),
    mb_mailling BOOLEAN DEFAULT false,
    mb_sms BOOLEAN DEFAULT false,
    mb_open BOOLEAN DEFAULT false,
    mb_open_date DATE,
    mb_profile TEXT,
    mb_memo_call VARCHAR(255),
    mb_memo_cnt INTEGER DEFAULT 0,
    mb_scrap_cnt INTEGER DEFAULT 0,
    mb_1 VARCHAR(255),
    mb_2 VARCHAR(255),
    mb_3 VARCHAR(255),
    mb_4 VARCHAR(255),
    mb_5 VARCHAR(255),
    mb_6 VARCHAR(255),
    mb_7 VARCHAR(255),
    mb_8 VARCHAR(255),
    mb_9 VARCHAR(255),
    mb_10 VARCHAR(255),
    left_user_id VARCHAR(20),
    right_user_id VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_members_mb_id ON public.members(mb_id);
CREATE INDEX idx_members_mb_recommend ON public.members(mb_recommend);
CREATE INDEX idx_members_mb_level ON public.members(mb_level);

-- RLS 정책 설정
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- 읽기 정책
CREATE POLICY "Users can view their own profile" 
ON public.members
FOR SELECT 
TO authenticated
USING (
    auth.uid() = user_id 
    OR mb_level >= 10
);

-- 수정 정책
CREATE POLICY "Users can update their own profile" 
ON public.members
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_members_updated_at
    BEFORE UPDATE ON public.members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 데이터 마이그레이션
INSERT INTO public.members (
    mb_no, mb_id, mb_password, mb_name, mb_nick, mb_nick_date, 
    mb_email, mb_homepage, mb_level, mb_sex, mb_birth, mb_tel, 
    mb_hp, mb_certify, mb_adult, mb_dupinfo, mb_zip,
    mb_addr1, mb_addr2, mb_addr3, mb_addr_jibeon, mb_signature, 
    mb_recommend, mb_point, mb_today_login, mb_login_ip, 
    mb_datetime, mb_ip, mb_leave_date, mb_intercept_date, 
    mb_email_certify, mb_email_certify2, mb_memo, mb_lost_certify, 
    mb_mailling, mb_sms, mb_open, mb_open_date, mb_profile, 
    mb_memo_call, mb_memo_cnt, mb_scrap_cnt,
    mb_1, mb_2, mb_3, mb_4, mb_5, mb_6, mb_7, mb_8, mb_9, mb_10,
    left_user_id, right_user_id
)
SELECT 
    mb_no,
    mb_id,
    mb_password,
    mb_name,
    mb_nick,
    CASE 
        WHEN mb_nick_date = '0000-00-00' THEN NULL 
        ELSE mb_nick_date::DATE 
    END,
    mb_email,
    mb_homepage,
    COALESCE(mb_level::INTEGER, 1),
    mb_sex,
    mb_birth,
    mb_tel,
    mb_hp,
    mb_certify,
    CASE 
        WHEN mb_adult = '1' THEN true 
        ELSE false 
    END,
    mb_dupinfo,
    mb_zip,
    mb_addr1,
    mb_addr2,
    mb_addr3,
    mb_addr_jibeon,
    mb_signature,
    mb_recommend,
    COALESCE(mb_point::INTEGER, 0),
    CASE 
        WHEN mb_today_login = '0000-00-00 00:00:00' THEN NULL 
        ELSE mb_today_login::TIMESTAMP WITH TIME ZONE 
    END,
    mb_login_ip,
    CASE 
        WHEN mb_datetime = '0000-00-00 00:00:00' THEN NULL 
        ELSE mb_datetime::TIMESTAMP WITH TIME ZONE 
    END,
    mb_ip,
    mb_leave_date,
    mb_intercept_date,
    CASE 
        WHEN mb_email_certify = '0000-00-00 00:00:00' THEN NULL 
        ELSE mb_email_certify::TIMESTAMP WITH TIME ZONE 
    END,
    mb_email_certify2,
    mb_memo,
    mb_lost_certify,
    CASE 
        WHEN mb_mailling = '1' THEN true 
        ELSE false 
    END,
    CASE 
        WHEN mb_sms = '1' THEN true 
        ELSE false 
    END,
    CASE 
        WHEN mb_open = '1' THEN true 
        ELSE false 
    END,
    CASE 
        WHEN mb_open_date = '0000-00-00' THEN NULL 
        ELSE mb_open_date::DATE 
    END,
    mb_profile,
    mb_memo_call,
    COALESCE(mb_memo_cnt::INTEGER, 0),
    COALESCE(mb_scrap_cnt::INTEGER, 0),
    mb_1,
    mb_2,
    mb_3,
    mb_4,
    mb_5,
    mb_6,
    mb_7,
    mb_8,
    mb_9,
    mb_10,
    left_user_id,
    right_user_id
FROM g5_member;

-- 시퀀스 업데이트
SELECT setval('members_id_seq', (SELECT MAX(mb_no) FROM public.members));

-- 테이블 코멘트
COMMENT ON TABLE public.members IS '회원 정보 테이블';
COMMENT ON COLUMN public.members.user_id IS 'Supabase 인증 사용자 ID';
COMMENT ON COLUMN public.members.mb_level IS '회원 레벨 (1: 일반회원, 10: 관리자)';
COMMENT ON COLUMN public.members.mb_recommend IS '추천인 ID';

-- 데이터 검증 쿼리
SELECT COUNT(*) as total_members FROM public.members;
SELECT mb_level, COUNT(*) as level_count FROM public.members GROUP BY mb_level ORDER BY mb_level;
SELECT COUNT(*) as certified_count FROM public.members WHERE mb_email_certify IS NOT NULL;
SELECT COUNT(*) as recommend_count FROM public.members WHERE mb_recommend IS NOT NULL;
SELECT COUNT(*) as binary_tree_count FROM public.members WHERE left_user_id IS NOT NULL OR right_user_id IS NOT NULL;
