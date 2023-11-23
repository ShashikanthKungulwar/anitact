{
    function handleAddRemoveFriend(event)
    {
        // console.log($(event.target).attr('data-id'));
        $.ajax({
            method:'POST',
            url:`/friendship/toggle/${$(event.target).attr('data-id')}`
        }).done(function(data){
            if(!data.data.friend)
            {
                event.target.parentNode.parentNode.removeChild(event.target.parentNode);
            }
            
        }).fail(function(error){
            console.error(error,'error in removing friend');
        })
    }
}