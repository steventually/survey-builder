import React from 'react';
import debug from 'sabio-debug';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import { Card, Accordion } from 'react-bootstrap';
import surveyCreationValidation from '../../../schema/surveys/surveyDesignerSchema';
import './surveyDesigner.css';

import { Select, Checkbox, TextArea, TextInput } from './designerComponents/questionFormFields';

const _logger = debug.extend('SurveyDesigner');

_logger('Hello I hope I am working');

const SurveyDesigner = () => {
    const questionTypes = [
        { id: 1, name: 'Open-Ended' },
        { id: 2, name: 'Multiple Choice: Select One' },
        { id: 3, name: 'Multiple Choice: Select Many' },
        { id: 4, name: 'Matrix: Select One' }, // Currently unsupported in instances
        { id: 5, name: 'Matrix: Select Many' }, // Currently unsupported in instances
        { id: 6, name: 'Date and Time' }, // Currently unsupported in instances
        { id: 7, name: 'Rank Order' }, // Currently unsupported in instances
        { id: 8, name: 'Likert Scale - 5 Point Scale' }, // Currently unsupported in instances
        { id: 9, name: 'Likert Scale - 7 Point Scale' }, // Currently unsupported in instances
        { id: 10, name: 'Binary - Yes / No' },
        { id: 11, name: 'Binary - True / False' },
    ];

    const buildBasicAnswerOption = (i) => {
        return {
            questionId: i,
            text: '',
            value: '',
            additionalInfo: '',
            sortOrder: 0,
        };
    };

    const surveyInitialValues = {
        name: '',
        description: '',
        statusId: 1,
        questions: [
            {
                question: '',
                helpText: '',
                isRequired: true,
                isMultipleAllowed: false,
                questionTypeId: 1,
                questionAnswerOptions: [buildBasicAnswerOption(0)],
                statusId: 1,
                sortOrder: 0,
            },
        ],
    };

    const mapQuestionTypes = (qType) => {
        return (
            <option key={qType.id} value={qType.id}>
                {qType.name}
            </option>
        );
    };

    const renderSelectedQuestionType = (question, index) => {
        const typeId = question.questionTypeId;
        const options = question.questionAnswerOptions;

        if (typeId === '2' || typeId === '3') {
            return (
                <>
                    <FieldArray name={`questions[${index}].questionAnswerOptions`}>
                        {({ move, remove, push }) => (
                            <div>
                                {options.map((option, i) => (
                                    <Card key={`question-${index}-option${i}`}>
                                        <div className="sd-content">
                                            <Field
                                                className="sD-form-control-small"
                                                name={`questions[${index}].questionAnswerOptions[${i}].text`}
                                                placeholder="Provide an answer option..."
                                            />
                                            <ErrorMessage
                                                name={`questions[${index}].questionAnswerOptions[${i}].text`}
                                            />
                                            <Field
                                                className="sD-form-control-small"
                                                name={`questions[${index}].questionAnswerOptions[${i}].additionalInfo`}
                                                placeholder="Additional info... (Optional)"
                                            />
                                            <ErrorMessage
                                                name={`questions[${index}].questionAnswerOptions[${i}].additionalInfo`}
                                            />

                                            <button
                                                className="btn-rounded"
                                                type="button"
                                                onClick={() => move(i, i - 1)}>
                                                <i className="dripicons-chevron-up" />
                                            </button>
                                            <button
                                                className="btn-rounded"
                                                type="button"
                                                onClick={() => move(i, i + 1)}>
                                                <i className="dripicons-chevron-down" />
                                            </button>
                                            <button
                                                className="btn-rounded"
                                                type="button"
                                                onClick={() => push(buildBasicAnswerOption(index))}>
                                                <i className="dripicons-plus" />
                                            </button>
                                            <button className="btn-rounded" type="button" onClick={() => remove(i)}>
                                                <i className="dripicons-minus" />
                                            </button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </FieldArray>
                </>
            );
        } else {
            return null;
        }
    };

    return (
        <>
            <Card className="surveyDesigner-card">
                <h1 className="surveyDesigner-header-title">Survey Designer</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={surveyInitialValues}
                    validationSchema={surveyCreationValidation}>
                    {({ values, errors }) => (
                        <Form autoComplete="off">
                            <Card.Body className="card-body">
                                <div className="form-control">
                                    <div>
                                        <TextInput
                                            className="form-control"
                                            label="Survey Name"
                                            name="name"
                                            placeholder="Enter survey name..."
                                        />
                                        <ErrorMessage className="invalid-feedback" name="name" />
                                    </div>
                                    <TextArea
                                        className="form-control"
                                        label="Survey Description"
                                        rows="3"
                                        name="description"
                                        placeholder="Enter survey description... (optional)"
                                    />
                                    <ErrorMessage className="invalid-feedback" name="description" />

                                    <FieldArray name="questions">
                                        {({ move, remove, insert }) => (
                                            <div>
                                                {values.questions.length > 0 &&
                                                    values.questions.map((question, index) => (
                                                        <Card key={index}>
                                                            <Card.Body>
                                                                <Accordion defaultActiveKey="0">
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header
                                                                            // className="surveyDesigner-form-label surveyDesigner-card surveyDesigner-header-title"
                                                                            flush="true">
                                                                            Question {index + 1}
                                                                        </Accordion.Header>

                                                                        <Accordion.Body>
                                                                            <div className="form-control">
                                                                                <div>
                                                                                    <TextArea
                                                                                        label={`Question`}
                                                                                        rows="4"
                                                                                        name={`questions.${index}.question`}
                                                                                        placeholder="Enter your question..."
                                                                                    />
                                                                                    <ErrorMessage
                                                                                        name={`questions.${index}.question`}
                                                                                    />
                                                                                </div>
                                                                                <div>
                                                                                    <TextInput
                                                                                        label="Help Text"
                                                                                        name={`questions.${index}.helpText`}
                                                                                        value={question.helpText}
                                                                                        placeholder="Enter help text... (Optional)"
                                                                                    />
                                                                                    <ErrorMessage
                                                                                        className="invalid-feedback"
                                                                                        name={`questions.${index}.helpText`}
                                                                                    />
                                                                                </div>
                                                                                <Select
                                                                                    label="Question Type"
                                                                                    name={`questions.${index}.questionTypeId`}>
                                                                                    {questionTypes.map(
                                                                                        mapQuestionTypes
                                                                                    )}
                                                                                </Select>
                                                                                <div />
                                                                                <br></br>

                                                                                <div>
                                                                                    {renderSelectedQuestionType(
                                                                                        question,
                                                                                        index
                                                                                    )}
                                                                                </div>

                                                                                <div />
                                                                                <Checkbox
                                                                                    name={`questions.${index}.isRequired`}
                                                                                />
                                                                                <b> Is this answer required?</b>
                                                                                <div />
                                                                                <div className="button-list">
                                                                                    <button
                                                                                        className="btn-rounded btn btn-warning"
                                                                                        type="button"
                                                                                        onClick={() =>
                                                                                            move(index, index - 1)
                                                                                        }>
                                                                                        <i className="dripicons-chevron-up" />
                                                                                        Shift up
                                                                                    </button>
                                                                                    <button
                                                                                        className="btn-rounded btn btn-warning"
                                                                                        type="button"
                                                                                        onClick={() =>
                                                                                            move(index, index + 1)
                                                                                        }>
                                                                                        <i className="dripicons-chevron-down" />
                                                                                        Shift down
                                                                                    </button>
                                                                                    <button
                                                                                        disabled={
                                                                                            index === 0 &&
                                                                                            values.questions.length < 2
                                                                                        }
                                                                                        className="btn-rounded btn btn-danger"
                                                                                        type="button"
                                                                                        onClick={() => remove(index)}>
                                                                                        Remove
                                                                                    </button>
                                                                                </div>
                                                                                <div />
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>
                                                            </Card.Body>

                                                            <button
                                                                className="btn-rounded btn btn-primary"
                                                                type="button"
                                                                onClick={() =>
                                                                    insert(index + 1, {
                                                                        question: '',
                                                                        helpText: '',
                                                                        isRequired: true,
                                                                        isMultipleAllowed: false,
                                                                        questionTypeId: 1,
                                                                        questionAnswerOptions: [
                                                                            buildBasicAnswerOption(index + 1),
                                                                        ],
                                                                        statusId: 1,
                                                                        sortOrder: index + 1,
                                                                    })
                                                                }>
                                                                Add Question
                                                            </button>
                                                        </Card>
                                                    ))}
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </Card.Body>
                            <pre>
                                <code>{JSON.stringify({ values, errors }, undefined, 2)}</code>
                            </pre>
                        </Form>
                    )}
                </Formik>
            </Card>
        </>
    );
};

export default SurveyDesigner;
