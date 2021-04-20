import React from 'react';
import PropTypes from 'prop-types';
import QAEntry from './QAEntry';
import { Col } from './Layout';

function QAList({ questions }) {
  return (
    <Col>
      {questions.map((question) => (
        <QAEntry question={question} key={question.id} />
      ))}
    </Col>
  );
}

QAList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    question_id: PropTypes.number,
    question_body: PropTypes.string,
    question_date: PropTypes.string,
    asker_name: PropTypes.string,
    question_helpfulness: PropTypes.number,
    reported: PropTypes.bool,
    answers: PropTypes.shape({
      id: PropTypes.shape({
        id: PropTypes.number,
        body: PropTypes.string,
        date: PropTypes.string,
        answerer_name: PropTypes.string,
        helpfulness: PropTypes.number,
      }),
    }).isRequired,
  })).isRequired,
};

export default QAList;