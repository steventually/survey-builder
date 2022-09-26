const SurveyDesigner = () => {
    const questionTypes = [
        { id: 1, name: 'Open-Ended' },
        { id: 2, name: 'Multiple Choice: Select One' },
        { id: 3, name: 'Multiple Choice: Select Many' },
        { id: 4, name: 'Matrix: Select One' },
        { id: 5, name: 'Matrix: Select Many' },
        { id: 6, name: 'Date and Time' },
        { id: 7, name: 'Rank Order' },
        { id: 8, name: 'Likert Scale - 5 Point Scale' },
        { id: 9, name: 'Likert Scale - 7 Point Scale' },
        { id: 10, name: 'Binary - Yes / No' },
        { id: 11, name: 'Binary - True / False' },
    ];

    const surveyInitialValues = {
        name: '',
        description: '',
        questions: [
            {
                question: '',
                helpText: '',
                isRequired: true,
                isMultipleAllowed: false,
                questionTypeId: 1,
                questionAnswerOptions: [
                    {
                        questionId: null,
                        text: '',
                        value: null,
                        additionalInfo: '',
                        createdBy: '',
                        sortOrder: '',
                    },
                ],
                statusId: 1,
                sortOrder: null,
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
                            <Card.Body className="surveyDesigner-card-body">
                                <div className="surveyDesigner-form-control">
                                    <label className="surveyDesigner-form-label">Survey Name</label>
                                    <Field
                                        className="surveyDesigner-form-control"
                                        label="Survey Name"
                                        name="name"
                                        placeholder="Enter survey name..."
                                    />
                                    <ErrorMessage name="name" />
                                    <Field
                                        className="surveyDesigner-form-control"
                                        label="Survey Description"
                                        name="description"
                                        placeholder="Enter survey description..."
                                    />
                                    <ErrorMessage name="description" />
                                    <FieldArray name="questions">
                                        {({ move, remove, push }) => (
                                            <div>
                                                {values.questions.length > 0 &&
                                                    values.questions.map((question, index) => (
                                                        <Card key={index}>
                                                            <Card.Body className="card-body">
                                                                <a className="surveyDesigner-form-label surveyDesigner-card surveyDesigner-header-title">
                                                                    Question {index + 1}
                                                                </a>
                                                                <div>
                                                                    <div>
                                                                        <TextArea
                                                                            label="Question"
                                                                            rows="4"
                                                                            name={`questions.${index}.question`}
                                                                            value={values.questions?.[index]?.question}
                                                                            placeholder="Enter your question..."
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <TextInput
                                                                            label="Help Text"
                                                                            name={`questions.${index}.helpText`}
                                                                            value={values.questions?.[index]?.helpText}
                                                                            placeholder="Enter help text... (Optional)"
                                                                        />
                                                                    </div>
                                                                    <Select
                                                                        label="Question Type"
                                                                        name={`questions.${index}.questionTypeId`}
                                                                        value={
                                                                            values.questions?.[index]?.questionTypeId
                                                                        }>
                                                                        {questionTypes.map(mapQuestionTypes)}
                                                                    </Select>
                                                                    <div />
                                                                    <Checkbox name={`questions.${index}.isRequired`} />
                                                                    <a> Is this answer required?</a>
                                                                    <div />
                                                                    <button
                                                                        className="surveyDesigner-btn surveyDesigner-btn-outline-danger"
                                                                        type="button"
                                                                        onClick={() => remove(index)}>
                                                                        Remove
                                                                    </button>
                                                                    <button
                                                                        className="surveyDesigner-btn surveyDesigner-btn-outline-primary"
                                                                        type="button"
                                                                        onClick={() => move(index, index - 1)}>
                                                                        Move up
                                                                    </button>
                                                                    <button
                                                                        className="surveyDesigner-btn surveyDesigner-btn-outline-primary"
                                                                        type="button"
                                                                        onClick={() => move(index, index + 1)}>
                                                                        Move down
                                                                    </button>
                                                                    <div />
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    ))}
                                                <button
                                                    className="surveyDesigner-btn surveyDesigner-btn-outline-primary"
                                                    type="button"
                                                    onClick={() =>
                                                        push({
                                                            question: '',
                                                            helpText: '',
                                                            isRequired: true,
                                                            isMultipleAllowed: false,
                                                            questionTypeId: 1,
                                                            questionAnswerOptions: [
                                                                {
                                                                    questionId: null,
                                                                    text: '',
                                                                    value: null,
                                                                    additionalInfo: '',
                                                                    createdBy: '',
                                                                    sortOrder: '',
                                                                },
                                                            ],
                                                            statusId: 1,
                                                            sortOrder: null,
                                                        })
                                                    }>
                                                    Add Question
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </Card.Body>
                            <pre>
                                <code>{JSON.stringify({values, errors}, undefined, 2)}</code>
                            </pre>
                        </Form>
                    )}
                </Formik>
            </Card>
        </>
    );
};

export default SurveyDesigner;
