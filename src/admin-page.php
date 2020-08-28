<?php

add_action( 'admin_menu', 'my_admin_menu' );

function my_admin_menu() {
	add_menu_page( 'SWO Plugin Informationen und Hilfe', 'SWO Infos', 'manage_options', 'myplugin/myplugin-admin-page.php', 'init_adminpage', 'https://i.ibb.co/NpswJpK/New-Project-1.png', 6  );
}

function init_adminpage(){
	?>
	<div class="wrap">
		<h2>SWO Plugin - Informationen, Hilfe und Links</h2>
        <p>Die neue SWO Wordpress Seite läuft mithilfe eines SWO-Plugins und eines SWO-Themes.<br>
        Neue Seiten werden visuell und direkt im Wordpress Admin bearbeitet. Dabei wird mit Bausteinen gearbeitet, welche in 3 Kategorien Unterteilt sind:<br><br>
        - Seiten<br>
        - Blöcke<br>
        - Elemente<br><br>
        Für jede Seite muss erst ein Seitenbaustein eingefügt werden. In diesen Seitenbaustein kann danach Inhalt mit Hilfe von Blöcken erstellt werden. In den Blöcken können manchmal noch zusätzlich Elemente eingefügt werden (z.B: Knöpfe oder Listen).<br>
        Weitere Angaben, welche man in den Bausteinen noch hinzufügen muss, sind rot, oder an einer roten Box zu erkennen.<br><br>
        Folgend finden Sie nützliche Links, zu Anleitungen, der Dokumentation und mehr.</p>
        <h3>Für Benutzer / Administratoren der Website:</h3>
        <p><a target="_blank" href="https://github.com/stiftungswo/wiki/wiki/SWO-WP-Website-(Manual)">Hier gehts zur Benutzeranleitung (Manual)</a></p>
        <h3>Für Entwickler:</h3>
        <p><a target="_blank" href="https://github.com/stiftungswo/wiki/wiki/SWO-WP-Website-(Dokumentation)">Hier gehts zur Dokumentation</a></p>
        <p><a target="_blank" href="https://github.com/stiftungswo/wp-theme/projects/1">Hier gehts zum Backlog und den Todos</a></p>
	</div>
    <style>
    #swofooter {
        position:fixed;
        width:100%;
        height:20px;
        bottom:0;
    }
    #wpfooter {
        display:none;
    }
    </style>
    <!-- Credits NICHT entfernen, dies wurde so abgesprochen. Danke. Sie können mich hier konntaktieren: me@davidkessler.ch oder 076 308 42 22 -->
    <p id="swofooter">Entwickelt von <a target="_blank" href="https://davidkessler.ch">davidkessler.ch</a> - 076 308 42 22 - me@davidkessler.ch</p>
	<?php
}

?>