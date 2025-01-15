<?php include "header.php"; ?>
<main>
        <link rel="stylesheet" href="/assets/css/jquery.orgchart.css">
        <script src="/assets/js/jquery.orgchart.js"></script>
        <style>
            .edge{display: none;}
            .orgchart{width: 100%}
            #chart-container {
                width: 100%;
                height: 100%;
                overflow: auto;
                text-align: center;
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
            main{
                margin-top: 10vh;
            }
            <?php if(is_mobile()){ ?>
          /*  .orgchart {
                overflow: scroll;
                touch-action: pan-x pan-y;
                -webkit-overflow-scrolling: touch; !* iOS 스크롤 최적화 *!
            }*/
            <?php } ?>
        </style>

        <div id="chart-container"></div>
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
                $.getJSON('/api/index.php?p=member&m=getOrgMember&mb_id=<?=$member['mb_id'] ?>', function (data) {
                    var orgChart = $('#chart-container').orgchart({
                        nodeTemplate : nodeTemplate,
                        'pan': true,
                        'zoom': true,
                        'data': data,
                        'nodeContent': 'name',

                    });
                    <?php if(is_mobile()){ ?>
                    let resizeWidth=parseInt($(".hierarchy .nodes").width())+100;
                    $("#chart-container,.orgchart,.chart-container").css("width",resizeWidth+"px");
                    <?php } ?>
                });
            });

        </script>
    </main>

<?php include "footer.php"; ?>