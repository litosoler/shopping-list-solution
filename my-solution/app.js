//single state object
var state = {
	items : []
};


//state modification funtions
function addItem(state, item){
	state.items.push({
		name:item,
		checked: false
	});
}//fin addItem
function checkedStatus(state, index){
	state.items[index].checked = !(state.items[index].checked); 
}//fin checkedStatus

function deleteItem(state, index){
	  state.items.splice(index, 1);
}//fin checkedStatus

//render function
function renderList(state, element){
	var arrayitems = state.items.map(function(item, index){
		return renderItem(item, index);
	});
	element.html(arrayitems);
}//fin renderList

function renderItem(item, index){
	var checkedAttr = "";
	if (item.checked == true){
		checkedAttr = "shopping-item__checked";
	}

	return	'<li id= "' + index +'">'+
		        	'<span class="shopping-item '+ checkedAttr + '">' + item.name + '</span>'+
		        '<div class="shopping-item-controls">'+
		          '<button class="shopping-item-toggle">'+
		            '<span class="button-label">check</span>'+
		          '</button>'+" "+
		          '<button class="shopping-item-delete">'+
		            '<span class="button-label">delete</span>'+
		          '</button>'+
		        '</div>'+
		    '</li>'
}//fin rederItem

//event listeners
//handdle addsItems
$('#js-shopping-list-form').submit(function(event){
	event.preventDefault();
	addItem(state, $('#shopping-list-entry').val());
	renderList(state, $('.shopping-list'));
	this.reset();
});
//handdle checked items
$('.shopping-list').on('click', '.shopping-item-toggle',function(event){
	var index = $(this).closest('li').attr('id');
	checkedStatus(state, index);
	renderList(state, $('.shopping-list'));
});
//handdle delete items
$('.shopping-list').on('click', '.shopping-item-delete',function(event){
	var index = $(this).closest('li').attr('id');
	deleteItem(state, index);
	renderList(state, $('.shopping-list'));
});

