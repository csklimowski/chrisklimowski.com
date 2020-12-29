
const elements = {
    usernameInput: null,
    importButton: null,
    dashboardTitle: null,
    dataDashboard: null,
    errorText: null,
    sortButtons: null,
    intro: null
}

let lastSort = 1;
let fetching = false;

document.addEventListener('DOMContentLoaded', function() {
    elements.usernameInput = document.getElementById('username-input');
    elements.importButton = document.getElementById('import-button');
    elements.dashboardTitle = document.getElementById('dashboard-title');
    elements.dataDashboard = document.getElementById('data-dashboard');
    elements.errorText = document.getElementById('error-text');
    elements.sortButtons = document.getElementById('sort-buttons');
    elements.intro = document.getElementById('intro');

    elements.usernameInput.addEventListener('keypress', function(event) {
        if (event.charCode === 13) fetchCollection();
    });
});


async function fetchCollection() {
    
    if (fetching) return;
    let username = elements.usernameInput.value;
    if (username.length === 0) return;
    fetching = true;
    elements.errorText.innerText = '';

    try {
        let res = await fetch('/api/bggdata?username=' + username);
        if (res.ok) {
            let json = await res.json();
            fetching = false;
            elements.dataDashboard.style.display = 'grid';
            elements.dashboardTitle.style.display = 'block';
            elements.intro.style.display = 'none';
            elements.dashboardTitle.innerText = username + "'s collection";
            visualize(json);
        } else {
            let error = await res.text();
            fetching = false;
            elements.errorText.innerText = error;
        }
    } catch(e) {
        fetching = false;
        console.log(e);
    }
}

async function fetchTop100() {

    if (fetching) return;
    fetching = true;
    elements.errorText.innerText = '';

    try {
        let res = await fetch('/api/bggdata');
        if (res.ok) {
            let json = await res.json();
            fetching = false;
            elements.dataDashboard.style.display = 'grid';
            elements.dashboardTitle.style.display = 'block';
            elements.intro.style.display = 'none';
            elements.dashboardTitle.innerText = "BGG Top 200";
            visualize(json);
        } else {
            let error = await res.text();
            fetching = false;
            elements.errorText.innerText = error;
        }
    } catch(e) {
        fetching = false;
        console.log(e);
    }
}

function visualize (gameStats) {

    const playerCounts = d3.range(1, 11); // the x-values shared by all series

    let stackData = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    for (let game of gameStats) {
        for (let count of playerCounts) {
            if (game.playerCounts[count-1].best) stackData[count][0]++;
            else if (game.playerCounts[count-1].recommended) stackData[count][1]++;
            else if (game.playerCounts[count-1].supported) stackData[count][2]++;
        }
    }


    const margin = ({top: 10, right: 0, bottom: 10, left: 25});
    const height = 300;
    const width = 500;

    const colors = ["#CDF6FF", '#75DAF0', '#3098AF'];
    const stackHeights = d3.stack().keys([0, 1, 2])(stackData)
    const maxHeight = d3.max(stackHeights, y => d3.max(y, d => d[1]));

    function labeledLeftAxis(g) {
        let s = g.selection ? g.selection() : g;
        g.call(d3.axisLeft(yScale).tickFormat(i => String(i)).tickSize(width-margin.left-margin.right));
        g.select('.domain').remove();
        s.selectAll('.tick line').attr('stroke', '#ffffff').attr('stroke-width', 0.1);
        s.selectAll('.tick text').attr('fill', '#ffffff');
    }

    const yScale = d3.scaleLinear()
        .domain([0, maxHeight])
        .range([height - margin.bottom, margin.top]);

    const xScale = d3.scaleBand()
        .domain(playerCounts)
        .rangeRound([margin.left, width - margin.right])
        .padding(0.08);
        
    const svg = d3.select("#game-graph>svg")
        .attr("viewBox", [0, 0, width, height]);

    const group = svg.append("g")
        .attr("transform", `translate(${width},0)`)
        .call(labeledLeftAxis);

    

    const rect = svg.append("g").selectAll("g")
        .data(stackHeights)
        .join("g")
        .attr("fill", (d, i) => colors[i])
        .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", (d, i) => xScale(i))
            .attr("y", height - margin.bottom)
            .attr("width", xScale.bandwidth())
            .attr("height", 0);

    rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("y", d => yScale(d[1]))
        .attr("height", d => yScale(d[0]) - yScale(d[1]))
        .transition()
        .attr("x", (d, i) => xScale(i))
        .attr("width", xScale.bandwidth());

    const ps = d3.select("#list").selectAll("p")
        .data(gameStats)
        .join('div')
        .attr('class', 'list-item')
        
        // .text(d => d.name)
        .append('a').attr('href', d => 'https://boardgamegeek.com/boardgame/' + d.id)
        .append('img').attr('src', d => d.thumbnail)
        .attr('title', d => d.name)
    

    d3.select("#matrix").selectAll("div")
        .data(gameStats)
        .join('div')
        .attr('class', 'matrix-row')
            .selectAll('div')
            .data(d => d.playerCounts.slice(0, 10))
            .join('div')
            .style('background-color', d => {
                if (d.best) return '#CDF6FF';
                if (d.recommended) return '#75DAF0';
                if (d.supported) return '#3098AF';
                return 'transparent';
            })
    
    d3.select('#list').style('height', gameStats.length*50);
    
    d3.selectAll('.matrix-row')
        .sort((a, b) => b.rating - a.rating)
        .style('top', (d, i) => (i*50) + 'px');
    
    d3.selectAll('.list-item')
        .sort((a, b) => b.rating - a.rating)
        .style('top', (d, i) => (i*50) + 'px');
}

function resort(count) {

    
    elements.sortButtons.children[lastSort-1].classList.remove('active');
    elements.sortButtons.children[count-1].classList.add('active');
    lastSort = count;

    d3.selectAll('.matrix-row')
        .sort((a, b) => {
            let aScore = a.rating, bScore = b.rating;

            if (a.playerCounts[count-1].best) aScore += 1000;
            if (b.playerCounts[count-1].best) bScore += 1000;
            if (a.playerCounts[count-1].recommended) aScore += 100;
            if (b.playerCounts[count-1].recommended) bScore += 100;
            if (a.playerCounts[count-1].supported) aScore += 10;
            if (b.playerCounts[count-1].supported) bScore += 10;

            return aScore <= bScore;
        })
        .transition()
        .duration(500)
        .style('top', (d, i) => (i*50) + 'px');
    
    d3.selectAll('.list-item')
        .sort((a, b) => {
            let aScore = a.rating, bScore = b.rating;

            if (a.playerCounts[count-1].best) aScore += 1000;
            if (b.playerCounts[count-1].best) bScore += 1000;
            if (a.playerCounts[count-1].recommended) aScore += 100;
            if (b.playerCounts[count-1].recommended) bScore += 100;
            if (a.playerCounts[count-1].supported) aScore += 10;
            if (b.playerCounts[count-1].supported) bScore += 10;
            return aScore <= bScore;
        })
        .transition()
        .duration(500)
        .style('top', (d, i) => (i*50) + 'px');
}
