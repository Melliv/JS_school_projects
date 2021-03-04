export function createView() {

    const ROW_COUNT = 40;
    const COL_COUNT = 20;

    let viewPortHeight = window.innerHeight;
    let rowHeight = viewPortHeight / ROW_COUNT;

    let viewPortWidth = window.innerWidth;
    let colWidth = viewPortWidth / COL_COUNT;

    let content = document.createElement('div');

    for (let index = 0; index < COL_COUNT; index++) {
        let rowElem = createColumn(rowHeight, index, colWidth, ROW_COUNT);
        content.append(rowElem);
    }


    document.body.append(content);
}

function createColumn(rowHeight, columnId, colWidth, ROW_COUNT) {
    let rowElem = document.createElement('div');
    rowElem.style.maxWidth = colWidth + 'px';
    rowElem.style.display = 'inline-block';
    rowElem.classList.add('column-' + columnId);

    for (let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex++) {
        let colElem = document.createElement('div');
        colElem.classList.add('id-column-' + columnId + '-row-' + rowIndex);

        if (columnId % 9 == 0 && columnId != 0 && (rowIndex < 15 || rowIndex > 25)) {
            colElem.style.backgroundColor = '#00FF00';
        } else {
            colElem.style.backgroundColor = '#0192FC';
        }

        colElem.style.minWidth = colWidth + 'px';
        colElem.style.minHeight = rowHeight + 'px';
        rowElem.append(colElem);
    }

    return rowElem;
}

