# scrumboar

> [scrumboar sandbox auf Heroku](https://scrumboar.herokuapp.com)

scrumboar ist ein Tool für die virtuelle Verwaltung eines Scrum Boards.

Dieses Projekt wird im Rahmen des Fachs Webengineering 2 durchgeführt und soll die gelernten Technologien zur Anwendung bringen.


## Beschreibung

scrumbaor ist eine Echtzeit Mehrbenutzerapplikation, die es einem Team möglich macht gemeinsam zu arbeiten.

scrumboar repräsentiert eine Tafel bestehend aus drei Spalten woran jeweils Karten angebracht werden können. scrumboar bietet dem Benutzer an neue Karten anzulegen, existierende Karten zu verändern, in einer anderen Spalte verschieben oder sogar zu löschen. Eine Karte kann einen Titel, eine Beschreibung sowie eine Aufwandsschätzung und eine verantwortliche Person enthalten.

## Technologien

##### node.js mit express
- Express ist für die Auslieferung des HTMLS und der benötigten Files an den Browser zuständig
- Express ermöglicht ein schnelles aufsetzen eines neuen Projektes mit `npm install express`
- Das erstelle Express Projekt beinhaltet bereits das Bootstrapping, Routing und sogar ein einfaches Fehlerhandling

##### jade
- Templating Engine, welche das schreiben von HTML vereinfacht
- Einfache Verwendung von Variablen innerhalb des Markups
- Wurde für das schreiben von index.hmtl|jade eingesetzt

##### socket.io
- Die Library vereinfacht den Umgang mit Websockets
- socket.io beantwortet den `ws://` Request, sendet die liste der Karten und wartet auf Events vom Browser

##### jQuery
- Vereinfacht die Verwendung von Javascript im Browser

##### Backbone.js
- Die Library bietet ein einfaches API für den Einsatz von Objekte im Frontend an
- Die Objekte Card, Cardview und Cardlist wurden damit implementiert
- Stellt eine Instanz von CardList pro Browser zur Verfügung, welche die Events mit socket.io verarbeitet

##### Underscore.js
- Optimierte Templating Engine für Backbone.js
- Wurde für das Template einer Karte angewendet
- Kann innerhalb eines Jade-Templates eingesetzt werden

##### node-uuid
- Generierte eindeutige IDs
- Findet serverseitig Einsatz für das Zuweisen einer ID an neu erstellte Karten, da die Karten nicht in einer Datenbank persistiert werden

##### Twitter Bootstrap
- Bietet Elemente für ein einfaches und schnelles Design der Frontend Anwendung

##### jasmine
- Unit Test Library für node.js
- Stellt die Modelle Card und CardList unter Tests
