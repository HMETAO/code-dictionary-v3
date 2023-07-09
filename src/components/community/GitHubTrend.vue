<template>
  <el-container class='trend-box'>
    <el-main>
      <div class='github-main'>
        <div v-for='(item,index) in trends' class='github-item'>
          <div class='github-body' :style='index % 2 === 0?"margin-right:4px":"margin-left:4px"'>
            <div class='github-body-header'>
              <el-link class='github-body-title' type='primary' :href='item.url'>{{ item.title }}</el-link>
            </div>
            <div class='github-body-description'>
              <div class='github-body-description-text'>
                {{ item.description }}
              </div>
            </div>
            <div class='github-body-footer'>
              <div>
                <i class='iconfont'>&#xe7df;</i>{{ item.starNumber }}
              </div>
              <div>
                <i class='iconfont'>&#xe6f3;</i>{{ item.shareNumber }}
              </div>
              <div v-if='item.language !==""' class='github-body-footer-language'>
                <i></i>{{ item.language }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {githubTrend} from '@/api/other'
import {errorMessage} from '@/utils/baseMessage'

export default {
  name: 'github-trend',
  data() {
    return {
      trends: [],
      trendQuery: {
        since: 'DAILY'
      },
      // todo 后期改为从字典表内查询
      sinceList: [
        {
          key: '今日',
          value: 'DAILY'
        },
        {
          key: '本周',
          value: 'WEEKLY'
        },
        {
          key: '本月',
          value: 'MONTHLY'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化方法
    init() {
      this.githubTrend()
    },
    // 获取趋势
    githubTrend() {
      githubTrend(this.trendQuery)
          .then(res => {
            this.trends = res.data
          }).catch(err => {
        errorMessage(err)
      })
    },
    // since切换回调
    // sinceChangeEventFunction() {
    //   this.githubTrend()
    // }
  }
}
</script>

<style scoped lang='less'>
.el-container {
  height: 100%;
  background-color: #fff;

  .el-header {
    padding: 18px 20px;
    margin: 0;
    border-bottom: 1px solid #EBEEF5;
  }

  .el-main {
    padding: 0 8px;
    margin: 0;
  }
}

.trend-box {
  flex: 1;
  overflow: auto;

  .github-main {
    display: flex;
    flex-wrap: wrap;
    flex: auto;
    height: 0;

    .github-item {
      width: 50%;

      .github-body {
        display: flex;
        flex-direction: column;
        height: 100px;
        margin-top: 8px;
        padding-left: 10px;
        padding-bottom: 10px;
        padding-right: 10px;
        background-color: #fafafa;
        border-radius: 5px;
        transition: .5s;

        .github-body-header {
          margin: 10px 0;
        }

        .github-body-title {
          font-weight: 700;
          font-size: 16px;
          color: #1e80ff;
        }

        .github-body-description {
          font-size: 10px;
          flex: 1;
          color: #888888;

          .github-body-description-text {
            overflow: hidden;
            text-overflow: ellipsis; /* 超出部分省略号 */
            word-break: break-all; /* break-all(允许在单词内换行。) */
            display: -webkit-box; /* 对象作为伸缩盒子模型显示 */
            -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
            -webkit-line-clamp: 3; /* 显示的行数 */
          }
        }

        .github-body-footer {
          display: flex;
          align-items: center;
          color: #7d7d7d;
          font-size: 10px;
          margin-top: 5px;

          div {
            margin-right: 15px;
          }

          i {
            margin-right: 3px;
            font-size: 8px;
          }

          .github-body-footer-language {
            display: flex;
            align-items: center;

            i {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #74b9ff;
            }
          }
        }
      }
    }
  }
}
</style>
