jQuery(function() {
	$(".image").change(showPreviewImage_click);
});

function showPreviewImage_click() {
    try {
        var inputFiles = this.files;
        if(inputFiles == undefined || inputFiles.length == 0) return;
        var inputFile = inputFiles[0];
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
    $(this).on('mousemove', moveCropBox);
}

function moveCropBox(e) {
    $(this).css('left', e.pageX - $(this).width()/2);
    $(this).css('top', e.pageY - $(this).height()/2);
}

function stopMoveCropBox() {
    $(this).off('mousemove');
}


function startChangeCropBox(e) {
    e.stopPropagation();
    $(this).on('mousemove', changeCropBox);
}

function changeCropBox(e) {
    var width = e.pageX - $('.crop-box').position().left;
    var height = e.pageY - $('.crop-box').position().top;
    $('.crop-box').width(width);
    $('.crop-box').height(height);
}

function stopChangeCropBox() {
    $(this).off('mousemove');
}

function crop() {
    var cropBox = $('.crop-box');
    $('#myCanvas').attr('width', cropBox.width()).attr('height', cropBox.height());
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("preview");
    ctx.drawImage(img,-cropBox.position().left,-cropBox.position().top);
}

