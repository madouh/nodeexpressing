$(function(){
	$('button').click(function(){
		alert('Hello with click....');
	});
	$('.delete_btn').click(function(){
	var r=confirm('Are you sure that you want to delete?');
	if(r==false){
		return false
	}
	})
});