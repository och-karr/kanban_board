//funkcja generujaca losowe id:
function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str; //losowy identyfikator dla kazdej tablicy i karteczki
}

//klasa kolumny
function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

	function createColumn() { // Przy tworzeniu nowej instancji klasy Column tworzony jest też element jQuery
		//tworzenie elementów, z których będzie składała się kolumna.
		// Znak dolara przed nazwą zmiennej dodaje się do zmiennych, ktore trzymają element jQuery.
		var $column = $('<div>').addClass('column'); //element div o klasie column
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);//dodajemy tytul i wypelniamy tekstem z wlasciwosci name
		var $columnCardList = $('<ul>').addClass('column-card-list');//lista na kartki
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');//przycisk usuwajacy liste
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');//przycisk dodajacy karteczke

		
    }
  }