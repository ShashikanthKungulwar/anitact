{
    function handleAddRemoveFriend(event)
    {
        event.preventDefault();
        // console.log($(event.target).attr('data-id'));
        $.ajax({
            method:'POST',
            url:`/friendship/toggle/${$(event.target).attr('data-id')}`
        }).done(function(data){
            if(data.data.friend)
            {
                $(event.target).html('Remove Friend');
            }
            else{
                $(event.target).html('Add Friend');
            }
        }).fail(function(error){
            console.error(error,'error in adding friend');
        })
    }
}