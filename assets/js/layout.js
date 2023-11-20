
{
    //functions to reduce load on the server and increase the user experence
    function handlePostSubmit(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/posts/create",
            data: $(event.target).serialize(),
            success: (response) => {
                // console.log(response.json());
                addPostToHome(response.data.post);
                toastr.success(response.data.message)
                // console.log(response.flash);
                // $(event.target).reset();
            },
            error: (error) => {
                console.log(error.responseText);
            }
        })
        event.target.reset();
    }



    const addPostToHome = (post) => {
        const ulRef = $('#posts-list-container');
        let ref=ulRef.prepend(
            `<div id="${post._id}">
        
            <a href="/posts/destroy/${post._id}" onclick="return handlePostDelete(event)">X</a>
         
                <span>name:${post.user.name}</span>
                <br>
                <span>content:${post.content}</span>
                <span>
                    <a class="toggle-like" href="/likes/toggle?id=${post._id}&type=Posts" data-likes='0'> 
                    0 Likes
                    </a>
                </span>
                <div class="comment-section">
                
                        <form action="/comments/create" method="post" onsubmit="return handleCommentPosting(event)">
                            <input type="text" name="content" placeholder="add comment" required />
                            <input type="hidden" name="post" value="${post._id}" />
                            <button>add</button>
                        </form>
                        
                            <div class="comments-list">
                            <ul id="${post._id}comments">
                            </ul>
                            </div>
                </div>
    </div>`
        )
        new ToggleLike($('.toggle-like',ref));
    }


    function handlePostDelete(event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: $(event.target).prop('href'),
            success: (response) => {
                // deletePost(response.id)
                // console.log(response.data);
                toastr.success(response.message)
                document.getElementById(response.data).remove();
            },
            error: (error) => {
                console.log(error.responseText);
            }
        })
    }


    function handleCommentPosting(event) {
        event.preventDefault();
        // console.log($(event.target).prop('action'));

        $.ajax({
            type: "POST",
            data: $(event.target).serialize(),
            url: `/comments/create`,
            success: (response) => {
                // console.log(response.data)
                toastr.success(response.message)
                addCommnetToPost(response.data);
                // toastr.success(response.data.message);
            },
            error: (error) => {
                console.log(error.responseText);
            }
        })
    }

    function addCommnetToPost(comment) {
        console.log(`${comment.post}comments`);
        const ulRef = $(`#${comment.post}comments`)
        let ref=ulRef.append(`<li class="comment" id="${comment._id}">
            
                <a href="/comments/destroy/${comment._id}" onclick="return handleCommnetDelete(event)" >X</a>
                comment:${comment.content}
                    user:${comment.user.name}
                    <span>
                    <a class="toggle-like" href="/likes/toggle?id=${comment._id}&type=Comments" data-likes='0'> 
                    0 Likes
                    </a>
                    </span>
            </li>`)
        new ToggleLike($('.toggle-like',ref));
    }


    function handleCommnetDelete(event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: $(event.target).prop('href'),
            success: (response) => {
                toastr.success(response.message)
                document.getElementById(response.data).remove();

            },
            error: (error) => {
                console.log(error.responseText);
            }
        })
    }


    function handlePreview(event) {
        if (event.target.files && event.target.files[0]) {
            const fr = new FileReader();
            fr.onload = (e) => {
                // Use the correct syntax for setting the 'src' attribute of an image
                // and selecting the image element using its ID
                $('#preview').attr('src', e.target.result);
                $('#preview').css('display', 'initial');
            };
            fr.readAsDataURL(event.target.files[0]);
        }
    }
}

