jQuery(function() {
	$(".image").change(showPreviewImage_click);
});

function showPreviewImage_click() {
    try {
        var inputFiles = this.files;
        if(inputFiles == undefined || inputFiles.length == 0) return;
        var inputFile = inputFiles[0];
        if (inputFile.type === "image/jpeg" || inputFile.type === "image/jpg" || inputFile.type === "image/png" || inputFile.type === "image/gif") {
            var img = $('<img/>',{'class':'preview', 'id':'preview'});
            img.appendTo($('.photo_copy'));
            var reader = new FileReader();
            reader.onload = function(event) {
                img.attr("src", event.target.result);
                initCropFunc();
            };
            reader.onerror = function(event) {
                alert("ERROR: " + event.target.error.code);
            };
            reader.readAsDataURL(inputFile);
        } else{
            alert('Error image file type!')
        }
    }
    catch(e) {
        if(e.name === "ReferenceError"){
            alert("Sorry, but your browser don't support image visualization.")
        }
    }
}

function initCropFunc() {
    $('.crop-box').on('mousedown', startMoveCropBox).on('mouseup', stopMoveCropBox);
    $('.crop-box-control').on('mousedown', startChangeCropBox).on('mouseup', stopChangeCropBox)
    $('.crop-btn').on('click', crop)
}

function startMoveCropBox() {
    $('body').on('mousemove', moveCropBox);
    $('body').on('mouseup', stopMoveCropBox);
}

function moveCropBox(e) {
    $('.crop-box').css('left', e.pageX - $('.crop-box').width()/2);
    $('.crop-box').css('top', e.pageY - $('.crop-box').height()/2);
}

function stopMoveCropBox() {
    $('body').off('mousemove');
}


function startChangeCropBox(e) {
    e.stopPropagation();
    $('body').on('mousemove', changeCropBox);
    $('body').on('mouseup', stopChangeCropBox);
}

function changeCropBox(e) {
    var width = e.pageX - $('.crop-box').position().left;
    var height = e.pageY - $('.crop-box').position().top;
    $('.crop-box').width(width);
    $('.crop-box').height(height);
}

function stopChangeCropBox() {
    $('body').off('mousemove');
}

function crop() {
    var cropBox = $('.crop-box');
    $('#myCanvas').attr('width', cropBox.width()).attr('height', cropBox.height());
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("preview");
    ctx.drawImage(img,-cropBox.position().left,-cropBox.position().top);
}

