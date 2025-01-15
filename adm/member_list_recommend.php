<?php
$sub_menu = "200100";
require_once './_common.php';

auth_check_menu($auth, $sub_menu, 'r');

$g5['title'] = $_GET['mb_id'].'님의 추천인';
require_once './admin.head.php';

?>
<style>
    #chart-container{min-height: 600px}
    .hierarchy
</style>
    <link rel="stylesheet" href="/assets/css/jquery.orgchart.css">
    <script src="/assets/js/jquery.orgchart.js"></script>
    <style>
        .edge{display: none;}
        .orgchart{width: 100%}
        #chart-container {
            width: 100%;
            overflow: auto;
            text-align: center;
            background-color: #fff;
        }
        .mem_info{
            border: 1px solid #ddd;
          background-color: #fff;
        }
        .mem_info > div{
            padding: 4px;
            text-align: left;
            margin-bottom: 5px;
            font-size: 14px;
        }
        .orgchart .node .title {
            font-size: 16px;
            height: 30px;
            line-height:22px;
        }

    </style>
    <div class="container" style="background-color: #fff">
        <div id="chart-container"></div>
    </div>
    <script>
        var nodeTemplate = function(data) {
            return `
	            	<div class="mem_info">
                        <div class="title mb_id">${data.title}</div>
                        <div>이름:${data.name}</div>
                        <div>가입일:${data.mb_datetime}</div>
                        <div>추천인:${data.mb_recommend}</div>
                    </div>
	`;
        };
        $(document).ready(function () {
            $.getJSON('/api/index.php?p=member&m=getOrgMember&mb_id=<?=$_GET['mb_id'] ?>', function (data) {
                var orgChart = $('#chart-container').orgchart({
                    nodeTemplate : nodeTemplate,
                    'pan': true,
                    'zoom': true,
                    'data': data,
                    'nodeContent': 'name',
                    'draggable': false,

                });
                <?php if(is_mobile()){ ?>
                let resizeWidth=parseInt($(".hierarchy .nodes").width())+100;
                $("#chart-container,.orgchart,.chart-container").css("width",resizeWidth+"px");
                <?php } ?>
                orgChart.$chartContainer.on('click', '.node', function() {
                    let  mb_id = $(this).find('.mb_id').text();
                    location.href = '/adm/member_list_recommend.php?mb_id='+mb_id;
                });
            });
        });
    </script>

<?php
require_once './admin.tail.php';
