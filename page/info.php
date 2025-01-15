<?php include "header.php"; ?>
<style>
    .container{
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
        margin-top: 5vw;
    }
</style>
    <main>
        <div class="container">
            <h2>승인내역</h2>
            <br/>
            <p>가입정보 : <?=$member['mb_id'] ?></p>
            <p>추천인: <?=$member['mb_recommend'] ?></p>
            <p>이름: <?=$member['mb_name'] ?></p>
            <p>휴대폰번호: <?=$member['mb_hp'] ?></p>
            <p>가입일: <?=$member['mb_datetime'] ?></p>
            <p>입금계좌: <?=$config['cf_bank'] ?></p>
            <p>승인 : <?=($member['mb_level'] == '1') ? '미승인' : '승인' ?></p>
        </div>
    </main>

<?php include "footer.php"; ?>