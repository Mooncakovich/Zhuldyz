let currentQuestion = 0;
    const questions = document.querySelectorAll('.question');
    const nextButton = document.getElementById('next');
    const question_blocks = document.querySelectorAll('.quiz-progress-questions-block');
    const blocks = document.querySelectorAll('.quiz-progress-block');
    const block_lines = document.querySelectorAll('.block');
    const question_block_lines = document.querySelectorAll('.question-block');

    let question_counter = 0;
    let tick=0;
    let counter = 0;
    let block_index = 0;
    let block_counter = 0;
    function showQuestion(index) {
        questions.forEach(question => {
            question.classList.remove('active');
        });
        questions[index].classList.add('active');
        if(index%6==0 && index>0 && tick!=1){
            tick+=1;
            block_counter+=1;
            blocks[block_counter].classList.add('active');
            block_lines[block_counter-1].classList.add('active');
            counter = counter + 6;
            question_blocks.forEach(question_block => {
                question_block.classList.remove('active');
            });
            question_block_lines.forEach(question_block_line => {
                question_block_line.classList.remove('active');
            });
        };
        block_index = index-counter;
        question_blocks[block_index].classList.add('active');
        if(block_index!=0){
            question_block_lines[block_index-1].classList.add('active');
        };
        tick=0;
        
    }

    nextButton.addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            showQuestion(++currentQuestion);
        } else {
            nextButton.style.display = 'none';
            calculateResults();
        }
    });

    function calculateResults() {
        let correctAnswers = 0;
        questions.forEach(q => {
            const selected = q.querySelector('input[type="radio"]:checked');
            if (selected && selected.getAttribute('data-correct') === 'true') {
                correctAnswers++;
            }
        });
        const resultText = 'You scored ' + correctAnswers + ' out of ' + questions.length;
        document.querySelector('.quiz-container').innerHTML = `<div class='result'><h1>Quiz Completed</h1><p>${resultText}</p></div>`;
    }

    document.querySelectorAll('.answer').forEach(answer => {
        answer.addEventListener('click', function() {
            let currentAnswers = this.closest('.question').querySelectorAll('.answer');
            currentAnswers.forEach(ans => ans.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input[type="radio"]').checked = true;
        });
    });

    // Initialize first question on load
    showQuestion(0);