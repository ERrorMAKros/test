/**
*	Application View
*/

define(['backbone', 'storage'], function(Backbone){

	var View = Backbone.View.extend({
		initialize: function () {
			this.listenTo(this.model, "change", this.render);
			this.templates = this.options.templates;
		},
		
		render: function () {
			var type = this.model.get("type");
			var page = this.model.get("page");

			var hData = $.jStorage.get('historyData', 'История посещений страниц \n');

			switch (type)
			{
				case 'page':
					// сохраняем в кеш браузера историю посещений
					$.jStorage.set('historyData', hData + 'Страница ' + page + '\n');

					$(this.el).find('.main-page').find('.menu-page').html(this.templates['page'](this.model.toJSON()));
					break;
					
				case 'mainpage':
					// сохраняем в кеш браузера историю посещений
					$.jStorage.set('historyData', hData + 'Главная страница \n');

					$(this.el).html(this.templates['mainpage'](this.model.toJSON()));
					break;

				case 'resultpage':
					alert(hData);
					break;

			}

			return this;
		}
					
	})

	return View;
});
