// const { event } = require("jquery");

class ToggleLike {
    constructor(toggleElement) {
        this.toggler = toggleElement,
            this.toggleLike();
    }
    toggleLike() {
        $(this.toggler).on('click', function (e) {
            e.preventDefault();
            let self = this;

            $.ajax({
                method: 'POST',
                url: $(self).attr('href')
            }).done((data) => {
                let likeCount = parseInt($(self).attr('data-likes'))
                if (data.data.deleted == true) {
                    likeCount--;
                }
                else {
                    likeCount++;
                }
                $(self).attr('data-likes', likeCount);
                $(self).html(`${likeCount} Likes`)
                
            }).fail((error) => {
                console.log('error in liking of the post /comment ');
            })
        })
    }
}