
//functions to reduce load on the server and increase the user experence
function handlePostSubmit(event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/posts/create",
        data: $(event.target).serialize(),
        success: (responce) => {
            console.log(responce);
            addPostToHome(responce.data.post);
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
    ulRef.prepend(
        `<div id="${post._id}">
        
            <a href="/posts/destroy/${post._id}" onclick="return handlePostDelete(event)">X</a>
         
                <span>name:${post.user.name}</span>
                <br>
                <span>content:${post.content}</span>
                <div class="comment-section">
                
                        <form action="/comments/create" method="post">
                            <input type="text" name="content" placeholder="add comment" required />
                            <input type="hidden" name="post" value="${post._id}" />
                            <button>add</button>
                        </form>
                        
                            <div class="comments-list">
                            <ul>
                            </ul>
                            </div>
                </div>
    </div>`
    )
}


function handlePostDelete(event) {
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: $(event.target).prop('href'),
        success: (response) => {
            // deletePost(response.id)
            // console.log(response.data);
            document.getElementById(response.data).remove();
        },
        error: (error) => {
            console.log(error.responseText);
        }
    })
}