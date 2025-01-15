$(document).ready(function() {
    // 초기 지갑 정보 로드
    loadWalletInfo();
    
    // 실적 정보 로드
    loadPerformanceInfo();
    
    // 보상 아이템 클릭 이벤트
    $('.reward-item').click(function() {
        const rewardType = $(this).data('reward-type');
        handleReward(rewardType);
    });
    
    // 모달 닫기
    $('.close, .confirm-btn').click(function() {
        $('#rewardModal').hide();
    });
});

// 지갑 정보 로드
function loadWalletInfo() {
    $.ajax({
        url: '/api/wallet/balance.php',
        method: 'POST',
        data: { action: 'get_balance' },
        success: function(response) {
            if (response.success) {
                updateWalletUI(response.data);
            }
        },
        error: function() {
            showError('지갑 정보를 불러오는데 실패했습니다.');
        }
    });
}

// 지갑 UI 업데이트
function updateWalletUI(data) {
    $('.poten-balance').text(formatNumber(data.poten_balance));
    $('.balance').text(formatNumber(data.bnb_balance) + ' BNB');
    $('.token-fee').text('token fee BNB ' + formatNumber(data.token_fee));
}

// 실적 정보 로드
function loadPerformanceInfo() {
    $.ajax({
        url: '/api/wallet/referral.php',
        method: 'POST',
        data: { action: 'get_info' },
        success: function(response) {
            if (response.success) {
                updatePerformanceUI(response.data);
            }
        },
        error: function() {
            showError('실적 정보를 불러오는데 실패했습니다.');
        }
    });
}

// 실적 정보 UI 업데이트
function updatePerformanceUI(data) {
    $('.partner-count').text(data.direct_referrals + '명');
    $('.detail-item:eq(0) .value').text(data.user_rank);
    $('.detail-item:eq(1) .value').text(formatNumber(data.team_volume) + ' PCT');
    $('.detail-item:eq(2) .value').text(formatNumber(data.personal_volume) + ' PCT');
}

// 보상 처리
function handleReward(rewardType) {
    let endpoint = '';
    let action = '';
    
    switch(rewardType) {
        case 'daily':
            endpoint = '/api/wallet/rewards.php';
            action = 'claim_daily';
            break;
        case 'gift':
            endpoint = '/api/wallet/rewards.php';
            action = 'claim_gift';
            break;
        case 'rank':
            endpoint = '/api/wallet/rewards.php';
            action = 'claim_rank';
            break;
        case 'referral':
            endpoint = '/api/wallet/referral.php';
            action = 'claim_referral';
            break;
        case 'event':
            endpoint = '/api/wallet/rewards.php';
            action = 'claim_event';
            break;
        case 'mission':
            endpoint = '/api/wallet/missions.php';
            action = 'participate';
            break;
    }
    
    if (endpoint && action) {
        $.ajax({
            url: endpoint,
            method: 'POST',
            data: { action: action },
            success: function(response) {
                if (response.success) {
                    showRewardModal(response.data);
                    loadWalletInfo(); // 지갑 정보 새로고침
                } else {
                    showError(response.message);
                }
            },
            error: function() {
                showError('보상 처리 중 오류가 발생했습니다.');
            }
        });
    }
}

// 보상 모달 표시
function showRewardModal(data) {
    $('.reward-message').text('축하합니다!');
    $('.reward-amount').text(formatNumber(data.amount) + ' PTC');
    $('#rewardModal').show();
    
    // 코인 애니메이션
    $('.coin-image').addClass('animate');
    setTimeout(function() {
        $('.coin-image').removeClass('animate');
    }, 1000);
}

// 에러 메시지 표시
function showError(message) {
    alert(message);
}

// 숫자 포맷팅 (소수점 8자리)
function formatNumber(num) {
    return parseFloat(num).toFixed(8);
}

// 애니메이션 CSS
$('<style>')
    .text(`
        .coin-image.animate {
            animation: bounce 1s ease;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-30px);
            }
            60% {
                transform: translateY(-15px);
            }
        }
    `)
    .appendTo('head');
