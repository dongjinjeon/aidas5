<?php
include_once('./_common.php');
?>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8" />
    <meta name="Keywords" content="" />
    <meta name="Description" content="" />
    <meta name="Author" content="" />
    <meta name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0, user-scalable=yes">
    <title><?=$config['cf_title'] ?></title>
    <link rel="stylesheet" href="/assets/pub1/css/fonts.css">
    <link rel="stylesheet" href="/assets/pub1/css/reset.css">
    <link rel="stylesheet" href="/assets/pub1/css/style.css">
    <script src="/assets/pub1/js/jquery-1.12.4.min.js"></script>
    <script src="/assets/pub1/js/script.js"></script>
</head>
<style>
    header{
        z-index: 9999;
        position: absolute;
        top: 0px;
        right: 0px;
    }
    header ul{
        display: flex;
    }
    header ul li{
        width: 100px;
        height: 100px;
    }
    .navmenu a, .navmenu a:focus {
        color: #fff;
        padding: 18px 15px;
        font-size: 16px;
        font-family: var(--nav-font);
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: space-between;
        white-space: nowrap;
        transition: 0.3s;
    }
    @media (max-width: 414px) {
        .btn {
            width: 40vw;
            height: 10vw;
            line-height: 10vw;
            font-size: 6vw;
        }
    }

</style>
<body>
<header id="header">
        <nav id="navmenu" class="navmenu">
            <ul>
                <?php if($is_member){ ?>
                    <li><a href="/bbs/logout.php" class="active">로그아웃</a></li>
                    <li><a href="/page/rc.php" class="active">내 추천인</a></li>
                    <li><a href="/page/info.php" class="active">승인내역</a></li>
                <?php  }else{ ?>
                    <li><a href="/bbs/login.php" class="active">로그인</a></li>
                <?php } ?>
            </ul>
        </nav>
</header>

<div id="wrap">
    <main>
        <div class="textBox">
            <h1>
                AIDAS <br>
                <span> SYSTEM </span>
            </h1>
            <p class="text01">
                모든 참여가 황금이 되는 기회, AIDAS.
            </p>
            <p class="text02">
                AIDAS는 AI의 혁신과 MIDAS의 황금 같은 변환 능력이 결합된 플랫폼입니다. <br>
                신화 속 마이더스의 손처럼, 사용자의 참여와 행동을 가치로 승화시키며, AI <br>기술로 모든 참여를 성과로 전환합니다.
            </p>
            <a href="/bbs/register.php" class="btn">
                가입신청
            </a>
        </div>
    </main>
</div>

</body>

</html>