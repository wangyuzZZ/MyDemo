import {Util} from "./util";
import "../less/attract-investment.less";
import "../less/normalized.less";
import "../less/common.jerry.less";
import "../less/common.lwj.less";
import "../less/common.wtt.less";
let util = new Util();
$(function(){
    $.ajax({
        url:"../json/attract-investment.json",
        success(res){
            // console.log(res)
            $(".classify-list").html(`${(function(){
                let htmlStr=""
            for(let i = 0;i < res[0].img.length; i++){
                htmlStr+=`
                    
                         <li>
                           <div>
                               <img src="${res[0].img[i].adrr}" alt="">
                               <span>${res[0].img[i].classify}</span>
                           </div>
                       </li>
                   
                    `
             }
                return htmlStr
            })()}`)
            $(".infor-cont").html(`${(function(){
                console.log(res)
                let htl = `
                    <h4>${res[0].information[0].send}</h4>
                    <p><strong>邮件名称：</strong>${res[0].information[0].emialname}</p>
                    <p><strong>邮件地址:</strong>${res[0].information[0].emial}</p>
                    <p><strong>邮件内容：</strong>${res[0].information[0].emialcont}</p>
                `;
                return htl
            })()}`)
        }
    })
})