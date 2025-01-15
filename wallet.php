<?php
include_once('./_common.php');

if (!$is_member) {
    alert('로그인 후 이용하세요.', G5_BBS_URL.'/login.php');
}

$g5['title'] = '내 지갑';
include_once('./_head.php');
?>

<div class="wallet-container">
    <!-- 지갑 정보 -->
    <div class="wallet-info">
        <div class="wallet-header">
            <h2>Total POTEN</h2>
            <div class="poten-balance">0.00000000</div>
            <div class="security-text">Being protected by POTEN certified security tech usage</div>
        </div>
        
        <!-- BNB 지갑 정보 -->
        <div class="wallet-card">
            <div class="wallet-card-header">
                <img src="<?php echo G5_URL ?>/img/bnb-logo.svg" alt="BNB" class="token-logo">
                <span>Binance Wallet</span>
            </div>
            <div class="wallet-card-body">
                <div class="balance-info">
                    <div class="balance">0.00000000 BNB</div>
                    <div class="token-fee">token fee BNB 0.000</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 실적 정보 -->
    <div class="performance-info">
        <div class="performance-header">
            <span>나의 실적</span>
            <a href="#" class="view-details">추천내역 ></a>
        </div>
        <div class="performance-stats">
            <div>내가 추천한 파트너</div>
            <div class="partner-count">0명</div>
        </div>
        <div class="performance-details">
            <div class="detail-item">
                <img src="<?php echo G5_URL ?>/img/direct.svg" alt="직급">
                <span>직급</span>
                <span class="value">0</span>
            </div>
            <div class="detail-item">
                <img src="<?php echo G5_URL ?>/img/group.svg" alt="그룹실적">
                <span>그룹실적</span>
                <span class="value">0 PCT</span>
            </div>
            <div class="detail-item">
                <img src="<?php echo G5_URL ?>/img/personal.svg" alt="직추천">
                <span>직추천</span>
                <span class="value">0 PCT</span>
            </div>
        </div>
    </div>

    <!-- 보상받기 섹션 -->
    <div class="rewards-section">
        <h3>보상받기</h3>
        <div class="rewards-grid">
            <!-- 일일 보상 -->
            <div class="reward-item" data-reward-type="daily">
                <img src="<?php echo G5_URL ?>/img/calendar.svg" alt="일일 보상">
                <div class="reward-info">
                    <div class="reward-title">일일 보상받기</div>
                    <div class="reward-desc">영상을 보고 PTC 500 획득</div>
                </div>
                <div class="reward-arrow">></div>
            </div>

            <!-- 선물상자 보상 -->
            <div class="reward-item" data-reward-type="gift">
                <img src="<?php echo G5_URL ?>/img/gift.svg" alt="선물상자">
                <div class="reward-info">
                    <div class="reward-title">선물상자 열고 PTC 획득</div>
                    <div class="reward-desc">하루한번 100~10,000 PTC 획득</div>
                </div>
                <div class="reward-arrow">></div>
            </div>

            <!-- 기타 보상 아이템들 -->
            <div class="reward-item" data-reward-type="rank">
                <img src="<?php echo G5_URL ?>/img/rank.svg" alt="직급">
                <div class="reward-info">
                    <div class="reward-title">직급 올리고 보상받기</div>
                    <div class="reward-desc">한 시간에 한번 1000PTC 획득</div>
                </div>
                <div class="reward-arrow">></div>
            </div>

            <div class="reward-item" data-reward-type="referral">
                <img src="<?php echo G5_URL ?>/img/referral.svg" alt="추천">
                <div class="reward-info">
                    <div class="reward-title">추천하고 보상받기</div>
                    <div class="reward-desc">파트너 만들고 5,000 PTC 획득</div>
                </div>
                <div class="reward-arrow">></div>
            </div>

            <div class="reward-item" data-reward-type="event">
                <img src="<?php echo G5_URL ?>/img/event.svg" alt="이벤트">
                <div class="reward-info">
                    <div class="reward-title">이벤트 참여하고 보상받기</div>
                    <div class="reward-desc">이벤트 참여하고 500 PTC 획득</div>
                </div>
                <div class="reward-arrow">></div>
            </div>

            <div class="reward-item" data-reward-type="mission">
                <img src="<?php echo G5_URL ?>/img/mission.svg" alt="미션">
                <div class="reward-info">
                    <div class="reward-title">미션 완료하고 보상받기</div>
                    <div class="reward-desc">클릭 후 400 PTC 받기</div>
                </div>
                <div class="reward-arrow">></div>
            </div>
        </div>
    </div>
</div>

<!-- 모달 -->
<div class="modal" id="rewardModal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>보상 받기</h3>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <div class="reward-message"></div>
            <div class="reward-animation">
                <div class="coin-image"></div>
                <div class="reward-amount"></div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="confirm-btn">확인</button>
        </div>
    </div>
</div>

<?php
include_once('./_tail.php');
?>
