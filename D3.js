let txtData = document.getElementById('txtData');
let btnUpdate = document.getElementById('btnUpdate');
let validateErrorData = document.getElementById('validateErrorData');
let data = [];

const width = 1000;
const height = 350;
const barHeight = 20;
const marginLeft = 50;

const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const xScale = d3.scaleLinear()
    .domain([0, d3.max(data) || 1])  
    .range([0, width-100]);

function Chart(data) {

    xScale.domain([0, d3.max(data) || 1]);

    const colorScale = d3.scaleOrdinal()
      .domain(d3.range(5))  
      .range(['#77dd77', '#ff6961', '#fdfd96', '#84b6f4', '#fdcae1']);

    const bars = svg.selectAll('rect')
        .data(data);

    bars
        .attr('x', 0)
        .attr('y', (d, i) => i * (barHeight + 5))
        .attr('width', d => xScale(d))
        .attr('height', barHeight)
        .attr('fill', (d, i) => colorScale(i % 5));

    bars.enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => i * (barHeight + 5))
        .attr('width', d => xScale(d))
        .attr('height', barHeight)
        .attr('fill', (d, i) => colorScale(i % 5));

    bars.exit().remove();

    const labels = svg.selectAll('text')
        .data(data);

    labels
        .attr('x', d => xScale(d) + 5)
        .attr('y', (d, i) => i * (barHeight + 5) + barHeight / 2)
        .attr('dy', '.35em')
        .text(d => d);


    labels.enter()
        .append('text')
        .attr('x', d => xScale(d) + 5)
        .attr('y', (d, i) => i * (barHeight + 5) + barHeight / 2)
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .text(d => d);

    labels.exit().remove();
}

txtData.addEventListener('change', function(){
    showElement(validateErrorData, false);
    showErrorEmpty(txtData, false);
})

btnUpdate.addEventListener('click', () => {
    if(txtData.value==''){
        showElement(validateErrorData, true);
        showErrorEmpty(txtData, true);
        return;
    }
    var newData = txtData.value.replace(/\s+/g, '').trim().split(",");
    Chart(newData)
    txtData.value = '';
});

function showElement(element, validate){
    if(validate){
        element.classList.remove('d-none');
        return;
    }
    element.classList.add('d-none');
}


function showErrorEmpty(element, validate){
    if(validate){
        element.classList.add('error-empty');
        return;
    }
    element.classList.remove('error-empty');
}



