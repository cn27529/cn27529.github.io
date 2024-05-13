/*
www.qsenow.com
推薦序號
ad27529@gmail.com=OCIvf8
cn27529@hotmail.com=L8jGNP
cn27529@gmail.com=8YtkTP
*/

// $('#UserName').val(‘andy030@gmail.com')
// $('#Password').val('1qaz@WSX')
// $('#CPassword').val('1qaz@WSX')
// $('#CountryCode').val('TW')
// $('#login_mobile').val('0986600301')
// //$(‘#Quick_RegBut').submit()

// $('#NewDialong1').attr('class','')
// $('.dialog_cover').attr('class','dialog_cover')
// $('#Quick_RegBut').attr('disabled',false)

// var removeBG = function(){
// $('#NewDialong1').attr('class','')
// $('.dialog_cover').attr('class','dialog_cover')
// $('#Quick_RegBut').attr('disabled',false)
// }

//by 2024
    let email = document.querySelector('#login_email');
    email.value='';
    let p_inputtext = document.querySelector('#pv_id_3 .p-inputtext'); p_inputtext.innerText = '台灣 (+886)'; p_inputtext.setAttribute('aria-label', '台灣 (+886)');
    let login_mobile = document.querySelector('#login_mobile');
    login_mobile.value='090909';
    let pv_id_3 = document.querySelector('#pv_id_3');


const qse = new Object();

// qse.removeBG = function() {
//     $('#login_email').attr('class', '')
//     $('#NewDialong2').attr('class', '')
//     $('.dialog_cover').attr('class', 'dialog_cover')
//     $('#Quick_RegBut').attr('disabled', false)
// }

// qse.run = function(mobile) {
//     let my_mobile = mobile
//     $('#login_email').val('g' + my_mobile + '@gmail.com')
//     $('#login_passowrd').val('1qaz@WSX')
//     $('#confirm_passowrd').val('1qaz@WSX')
//     $('#login_mobile').val(my_mobile)
//     $('#Quick_RegBut').submit()
// }

// qse.run = function(mobile) {
//     let my_mobile = mobile
//     let login_email = document.querySelector('#login_email'); login_email.value = 'g' + my_mobile + '@gmail.com';
//     let password = document.querySelector('#login_passowrd .p-password-input'); password.value = '1qaz@WSX';
    
//     let p_inputtext = document.querySelector('#pv_id_3 .p-inputtext'); p_inputtext.innerText = '台灣 (+886)'; p_inputtext.setAttribute('aria-label', '台灣 (+886)');
//     let login_mobile = document.querySelector('#login_mobile');
//     login_mobile.value = my_mobile;

//     //$('#Quick_RegBut').submit()
// }

qse.info_to_display = function(mobile) {
    let my_mobile = mobile
    let mini = mobile.substring(6);
    let login_email = document.querySelector('#login_email'); login_email.value = 'john' + mini + '@boofx.com';
    let password = document.querySelector('#login_passowrd .p-password-input'); password.value = '1qaz@WSX';
    let confirm_passowrd = document.querySelector('#confirm_passowrd .p-password-input'); confirm_passowrd.value = '1qaz@WSX';

    let p_inputtext = document.querySelector('.p-dropdown-label'); p_inputtext.innerText = '台灣 (+886)'; p_inputtext.setAttribute('aria-label', '台灣 (+886)');
    let login_mobile = document.querySelector('#login_mobile');
    login_mobile.value = my_mobile;

    //$('#Quick_RegBut').submit()
}

qse._prefix_ary = ["0940", "0941", "0942", "0943", "0944", "0945", "0946", "0947", "0948", "0949", "0990", "0991", "0992", "0993", "0994", "0995", "0996", "0997", "0998", "0999"];

qse.mobile_generate = function(max_count) {

    let _allow_reduplicate = false;
    let _max_count = max_count;
    let _numbers = [];
    let _max_postfix = 999999;
    let _min_postfix = 0;
    while (_numbers.length < _max_count) {
        let _number = "";
        // 先取的隨機的prefix
        let _prefix_i = Math.floor(Math.random() * (this._prefix_ary.length));
        let _prefix = this._prefix_ary[_prefix_i];

        // 後面的數字
        let _postfix = Math.floor(Math.random() * (_max_postfix)) + "";
        while (_postfix.length < 6) {
            _postfix = "0" + _postfix;
        }

        _number = _prefix + _postfix;
        if (_allow_reduplicate === false) {
            if ($.inArray(_number, _numbers) === -1) {
                _numbers.push(_number);
            }
        } else {
            _numbers.push(_number);
        }
    }
    return _numbers;
}

//取得手機數量
var mobiles = qse.mobile_generate(10)
//執行註冊
mobiles.forEach((item, index, mobiles) => {
    //qse.run(item)
    qse.info_to_display(item)
})

qse.info_to_display(mobiles[0])


相關校正項目
$('#NewDialong2').attr('class','')
$('.dialog_cover').attr('class','dialog_cover')

鈹 (移除), 鉛 (移除), 砷 (移除), 氮 (移除), 釔 (移除)
天門冬胺酸 (Aspartic Acid)
眼睛問題, 提高視力 (以近視為主)



