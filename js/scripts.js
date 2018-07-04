window.addEventListener("load", function() {
    console.log("All resources finished loading!");
});

//funkcja generujaca losowe id:
function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str; //losowy identyfikator dla kazdej tablicy i karteczki
}

//funkcja konstruujaca klase kolumny - Column
function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

	function createColumn() { // Przy tworzeniu nowej instancji klasy Column tworzony jest też element jQuery

		//tworzenie elementów, z których będzie składała się kolumna:
		// Znak dolara przed nazwą zmiennej dodaje się do zmiennych, ktore trzymają element jQuery.
		var $column = $('<div>').addClass('column'); //element div o klasie column
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);//dodajemy tytul i wypelniamy tekstem z wlasciwosci name
		var $columnCardList = $('<ul>').addClass('column-card-list');//lista na kartki
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');//przycisk usuwajacy liste
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');//przycisk dodajacy karteczke
		

		//podpinanie odpowiednich zdarzen:
		//usuwanie kolumny za pomoca klikniecia
		$columnDelete.click(function() {
			self.removeColumn();
		});
		//dodanie nowej karteczki i nadanie jej nazwy
		$columnAddCard.click(function() {
			self.addCard(new Card(prompt("Enter the name of the card"))); //new - tworzenie nowego obiektu
		});

		//konstruowanie kolumny i jej zwrocenie:
		$column.append($columnDelete)
				.append($columnTitle)
				.append($columnAddCard)
				.append($columnCardList);
		return $column;
    }
}

//metoda dla klasy column
Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element); //podpinamy karte do ul
	},
	removeColumn: function() {
		this.$element.remove(); //usunie kolumne gdy nacisniemy(click) x
	}
};

//funkcja konstruujaca klase Card:
function Card(description) {
	var self = this;
	this.id = randomString();
	this.description = description;
	if (description != null) {
		this.$element = createCard();
	}else {}

    function createCard() {

		//tworzenie elementow, z których będzie składała się karta
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete').text('x');

		//podpinanie odpowiednich zdarzeń pod stworzone elementy - tylko usuwanie karty
		$cardDelete.click(function(){
			self.removeCard();
		});

		//konstruowanie karty i jej zwrócenie
		$card.append($cardDelete)
				.append($cardDescription);

		return $card;
	}
}

//metoda dla klasy card
Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
}

//metoda podpieta bezposrednio do obiektu board - nie jest to klasa
var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element); //wskazuje na board.$element
      initSortable();
    },
    $element: $('#board .column-container')
};

//korzystamy z rozszerzenia jQueryUI - biblioteka.
//metoda sortable - sortujemy elementy za pomoca metody drag'n'drop
function initSortable() {
	$('.column-card-list').sortable({ //wybieramy wszystkie listy kart i dodajemy funkcjonalnosc sortowania
	  connectWith: '.column-card-list', 
	  placeholder: 'card-placeholder' //trzyma nazwe klasy, ktora pojawia sie po najechaniu na puste pole
	}).disableSelection(); //wyłączenie możliwości zaznaczania tekstu na kartach, które przeciągamy
}

//podpiecie na element create-column zdarzenia klikniecia
$('.create-column')
.click(function(){
	var name = prompt('Enter a column name');
	if (name != null) {
		var column = new Column(name);
		board.addColumn(column);
	} else {}
});

// CREATING COLUMNS
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// ADDING COLUMNS TO THE BOARD
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// CREATING CARDS
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
doingColumn.addCard(card2);
