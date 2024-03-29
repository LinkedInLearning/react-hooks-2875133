# React Hooks Essentials

Dies ist das Repository für den **LinkedIn Learning** Kurs React Hooks Essentials. Den gesamten Kurs finden Sie auf [LinkedIn Learning][lil-course-url].

![React Hooks Essentials][lil-thumbnail-url] 

React zählt durch seine Stabilität, Schnelligkeit und Vielfältigkeit zu den populärsten Frontend-Frameworks. Komponenten mussten bislang als Klasse geschrieben werden, doch steht seit der Einführung der React Hooks eine zweite, oft einfachere Variante, Komponenten zu implementieren, zur Verfügung. Was genau die React Hooks sind und wie sie eingesetzt werden, lernen Sie Schritt für Schritt in diesem Kurs: Sie erstellen eine Todo-Liste, passen diese mit Hilfe von React Hooks an und sehen so, wie man bestehende React-Klassenkomponenten als sogenannte Functional Components entsprechend umbaut.

## Anleitung

Dieses Repository hat Branches für jedes Video im Kurs. Verwenden Sie das Ausklappmenü "Branch: ..." in GitHub um zwischen den unterschiedlichen Branches hin und her zu wechseln bzw. um bei einem spezifischen Status einzusteigen. Oder Sie fügen `/tree/BRANCH_NAME` der URL hinzu um direkt in den gewünschten Branch zu wechseln.

## Branches

Die Git Branches sind passend zu den Videos im Kurs strukturiert. Die Namenskonvention lautet `Kapitel#_Video#-name`. Der Branch `02_03-xyz` beinhaltet zum Beispiel den Code für das dritte Video im zweiten Kapitel. 

Alle Branches enthalten jeweils das Ergebnis des jeweiligen Videos. Die Ausgangsbasis ist das vorangegangene Video.

Wenn Sie von einem Branch nach Änderungen zum nächsten Branch wechseln, erhalten Sie möglicherweise die folgende Meldung:

```
error: Your local changes to the following files would be overwritten by checkout:        [files]
Please commit your changes or stash them before you switch branches.
Aborting
```

Dieses Problem lösen Sie wie folgt:
    Add changes to git using this command: git add .
    Commit changes using this command: git commit -m "some message"

## Installation

1. Um diese Übungsdateien nutzen zu können, müssen Sie folgendes installiert haben:
   - `npm`
   - `git` 
2. Klonen Sie das Repository in Ihre lokale Maschine unter Verwendung von terminal (Mac), CMD (Windows) oder ein anderes Werkzeug mit grafischer Bedienoberfläche wie SourceTree.
3. Stellen Sie sicher, dass sie bei jedem Wechsel in eine andere Branch ein `npm install` ausführen

### Autor

**David Lorenz**

Twitter: https://twitter.com/activenode
Medium: https://medium.com/@activenode
dev.to: https://dev.to/activenode/
Website: https://activenode.de 

_Frontend Architect_

[lil-course-url]: https://www.linkedin.com/learning/react-hooks-grundkurs
[lil-thumbnail-url]: https://cdn.lynda.com/course/2875133/2875133-1638882768893-16x9.jpg
