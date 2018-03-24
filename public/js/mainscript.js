
    function showMoveButton(index) {
        var moveDir = document.getElementById('moveDir' + index);
        var select = document.getElementById('selDir' + index);
        var selValue = select.querySelector('[selected]').value;
        var curr = document.getElementById("selDir" + index).value
        console.log(curr + selValue)
        if (selValue != curr) return moveDir.style.display = 'inline-block'
        moveDir.style.display = 'none'
    }
    function moveDir(linkID, select) {
        var select = document.getElementById(select);
        var currDir = select.querySelector('[selected]').value;
        var newDir = select.value;
        $.ajax({
            url: '/moveDir',
            data: {
                linkID, newDir, currDir
            },
            type: 'GET',
            success: function (data) {
                console.log(data)
                reloadLink(data, '')
            }
        })
    }

    function reloadLink(dir, btn) {
        var reloadlink = document.getElementById('reloadLink');
        const _btn = document.getElementById(btn);
        //console.log(btn)
        $.ajax({
            url: '/loadLink/' + dir,
            type: 'GET',
            beforeSend: function(){
                if(btn) _btn.className = 'ui loading primary basic button'
            },
            success: function (data) {
                //console.log(dirName);

                reloadlink.innerHTML = data;
                if(btn) _btn.className = 'ui primary basic button'
                $('.ui.dropdown').dropdown()
                $('.activating.element').popup();
            }
        })
    }
    function addDir() {
        var x = document.getElementById('submitDir');
        if (x.style.display === 'none') return x.style.display = 'block'
        x.style.display = 'none'
    }
    // function loadLink(dir){
    //     $.ajax({
    //         type: 'GET',
    //         url: '/loadLink',
    //         data: {dir},
    //         success: function(data){
    //             console.log(data);
    //         },
    //         error: function(err){
    //             console.log(err)
    //         }
    //     })
    // }
    function renameDir() {
        var x = document.getElementById('submitRenameDir');
        if (x.style.display === 'none') return x.style.display = 'block'
        x.style.display = 'none'

    }
    function submitRenameDir(dir){
        const renameDir = document.getElementById('inputRenameDir');
        const inputRenameDir = renameDir.value;
        console.log(inputRenameDir)
        if(!inputRenameDir) return alert('Nhập tên thư mục mới vào nhé.')
        $.ajax({
            type: 'GET',
            url: '/renameDir',
            data: {dir, inputRenameDir},
            success: function(data){
                console.log(data)
                var lisDir = document.getElementById('listDir').innerHTML = data;
                // hide submit new dir div
                renameDir.value = '';
                var x = document.getElementById('submitRenameDir');
                x.style.display = 'none'
                reloadLink(inputRenameDir)
            }
        })
    }
    function createDir() {
        const createDir = document.getElementById('createDir');
        const inputCreateDir = createDir.value;
        const btn = document.getElementById('btnCreateDir');
        if(!inputCreateDir) return alert('Nhập tên thư mục vào nhé.')
        $.ajax({
            type: 'GET',
            url: '/addDir',
            data: {inputCreateDir},
            beforeSend: function(){
                btn.className = 'ui loading button'
            },
            success: function(data){
                console.log(data)
                var lisDir = document.getElementById('listDir').innerHTML = data;
                // hide submit new dir div
                createDir.value = '';
                var x = document.getElementById('submitDir');
                x.style.display = 'none'
                //undo btn
                btn.className = 'ui button'
            }
        })
    }

    function delDir(dir){
        var result = confirm("Các links trong thư mục sẽ mất khi xóa thư mục. Vẫn xóa thư mục này đúng không?");
        if (result) {
            $.ajax({
                type: 'GET',
                url: '/delDir',
                data: {dir},
                success: function(data){
                    console.log(data)
                    var lisDir = document.getElementById('listDir').innerHTML = data;
                    // redirect to root after delete
                    reloadLink('root', '')
                }
            })
        }
        
    }
    function delLink(linkID, dir){
        var result = confirm("Xóa link này chứ?");
        if (result) {
            $.ajax({
                type: 'GET',
                url: '/delete',
                data: {linkID},
                success: function(data){
                    console.log(data)
                    //var lisDir = document.getElementById('listDir').innerHTML = data;
                    // redirect to root after delete
                    reloadLink(dir, '')
                }
            })
        }
        
    }
    function init() {
        
        
    }
    window.onload = init();
