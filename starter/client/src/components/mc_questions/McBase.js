import React from 'react';

const questions = [
    {
        question: 'What the heck',
        answer_options: ["it's fine", "not fine", "sure", "no"]
    },
    {
        question: 'What the heck',
        answer_options: ["it's fine", "not fine", "sure", "no"]
    },
    {
        question: 'What the heck',
        answer_options: ["it's fine", "not fine", "sure", "no"]
    }
]

function Home(props) {
  return (
    <div className='mc-con'>
        <div className='mc-side-bar'>
            <h4 className='side-bar-head'>Your questions</h4>
            <p className='side-bar-info'>answer more questions and get a good match</p>
            <button className='side-bar-btn answered'>answered</button>
            <button className='side-bar-btn new'>new</button>
        </div>
        <div className='mc-ques-con'>
            {questions.map ((question) => {
                return (
                    <div className='ques-con'>
                        <h4 className='ques-head'>{question.question}</h4>
                        <ul>
                            <form>
                                <input className='mc-sel' type='checkbox' id='1' name='1' value='1'/>
                                    <label className='mc-sel-label' for='1'>{question.answer_options[0]}</label><br/>
                                <input className='mc-sel' type='checkbox' id='2' name='1' value='1'/>
                                    <label className='mc-sel-label' for='1'>{question.answer_options[1]}</label><br/>
                                <input className='mc-sel' type='checkbox' id='3' name='1' value='1'/>
                                    <label className='mc-sel-label' for='1'>{question.answer_options[2]}</label><br/>
                                <input className='mc-sel' type='checkbox' id='4' name='1' value='1'/>
                                    <label className='mc-sel-label' for='1'>{question.answer_options[3]}</label><br/>
                            </form>
                        </ul>
                    </div>
                )
            })}
        </div>
    </div>
  );
}
export default Home;
