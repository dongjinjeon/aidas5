<?php
include_once('./_common.php');
?>
<!doctype html>
<html lang="ko-KR" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?=$config['cf_title'] ?></title>

    <link rel="stylesheet" href="/js/font-awesome/css/font-awesome.min.css?ver=2303229">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css?ver=2303229">
    <link rel="stylesheet" href="/theme/Bootstrap5-0.9.7/css/custom.css?ver=2403101">
    <script src="/js/jquery-1.12.4.min.js?ver=2304171"></script>
    <script src="/js/jquery-migrate-1.4.1.min.js?ver=2304171"></script>
    <script src="/js/jquery.menu.js?ver=2304171"></script>
    <script src="/js/common.js?ver=2304171"></script>
    <script src="/js/wrest.js?ver=2304171"></script>
    <script src="/js/placeholders.min.js?ver=2304171"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com" rel="preconnect">
    <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <!-- Vendor CSS Files -->
    <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="/assets/vendor/aos/aos.css" rel="stylesheet">
    <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
    <!-- Main CSS File -->
    <link href="/assets/css/main.css" rel="stylesheet">
</head>
<style>
    @media (min-width: 1400px) {
        .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
            max-width: 100%;
            padding: 0;
        }
    }
    .poten-system {

    }
    .title {
        font-size: 3rem;
        font-weight: bold;
    }
    .subtitle {
        font-size: 2.5rem;
        font-weight: bold;
        color: #A89E85; /* 금색 느낌 */
    }
    .description {
        margin: 20px 0;
        line-height: 1.8;
    }
    .btn-custom {
        background-color: #545454;
        color: #fff;
        font-weight: bold;
        padding: 10px 30px;
        border: none;
        border-radius: 5px;
        margin-top: 10px;
        text-align: right;
        font-size: 1.5rem;
    }
    .btn-custom:hover,
    .btn-custom:active
    {
        background-color: #545454;
        color: #fff;
    }
    .hero .container {
        position: absolute;
        bottom: 12%;
        left: 6%;
        z-index: 3;
    }
    .navmenu{
        color: yellow !important;
        font-weight: bold;
    }
    .hero .container{
        left:0;
    }
    main{
        width: 100%;
        position: absolute;
        top: 12vh;
    }
</style>

<body class="scrolled">

<header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid position-relative d-flex align-items-center justify-content-between">

        <a href="/" class="logo d-flex align-items-center me-auto me-xl-0">
            <!-- Uncomment the line below if you also wish to use an image logo -->
            <!-- <img src="assets/img/logo.png" alt=""> -->
            <h1 class="sitename"><?=$config['cf_title'] ?></h1><span>.</span>
        </a>

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
            <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
    </div>
</header>
