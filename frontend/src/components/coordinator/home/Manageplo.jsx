import React, { useState } from "react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/outline";

import "../coordinatorstylings/Manageplo.css";

const Manageplo = () => {
  const [formContent, setFormContent] = useState([
    {
      id: 0,
      name: "0",
      label: "Untitled Question",
      required: false,
      question_type: "short_answer",
      list: [],
    },
  ]);
  const [onEdit, setOnEdit] = useState(false);
  const [textField, setTextField] = useState("");
  const [editedField, setEditedField] = useState("");

  const addQuestion = () => {
    const field = {
      name: `question_${formContent.length}`,
      label: "Untitled question",
      required: false,
      question_type: "short_answer",
      list: [],
    };
    setFormContent([...formContent, field]);
  };

  const removeQuestion = (fieldName) => {
    const updatedFormContent = formContent.filter(
      (field) => field.name !== fieldName
    );
    setFormContent(updatedFormContent);
  };

  const editField = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].label = fieldLabel;
      setFormContent(formFields);
    }
  };

  const editFieldType = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].question_type = fieldLabel;
      setFormContent(formFields);
    }
  };

  const addFieldOption = (fieldName, option) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
    if (fieldIndex > -1) {
      if (option && option !== "") {
        formFields[fieldIndex].list.push(option);
        setFormContent(formFields);
        setTextField("");
      }
    }
  };

  return (
    <div className="form-container-plo">
      <div className="form-header-plo">
        <h1 className="form-title-plo">Manage plo</h1>
        <p className="form-description-plo">Form Description</p>
      </div>

      <div className="form-content-plo">
        {formContent.map((field) => {
          return (
            <div key={field.id} className="form-field-plo">
              <div className="field-label-edit-plo">
                <div className="field-label-plo">
                  {onEdit && editedField === field.name ? (
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => editField(field.name, e.target.value)}
                      onBlur={() => {
                        setOnEdit(false);
                        setEditedField("");
                      }}
                      className="edit-input-plo"
                    />
                  ) : (
                    <label
                      onClick={() => {
                        setOnEdit(true);
                        setEditedField(field.name);
                      }}
                      className="field-label-text-plo"
                    >
                      {field.label}
                    </label>
                  )}
                </div>
                <div className="field-type-select-plo">
                  <select
                    onChange={(e) => editFieldType(field.name, e.target.value)}
                    className="field-type-select-plo"
                  >
                    <option value="short_answer">Short Answer</option>
                    <option value="paragraph">Paragraph</option>
                    <option value="multichoice">Multichoice</option>
                  </select>
                </div>
                <div className="remove-question-button-plo">
                  <button onClick={() => removeQuestion(field.name)}>
                    <XCircleIcon className="remove-icon-plo" />
                  </button>
                </div>
              </div>

              <div className="field-input-plo">
                {field.question_type === "short_answer" && (
                  <input
                    type="text"
                    className="short-answer-input-plo"
                    placeholder={field.label}
                  />
                )}
                {field.question_type === "paragraph" && (
                  <textarea
                    rows={4}
                    className="paragraph-input-plo"
                    placeholder={field.label}
                  />
                )}
                {field.question_type === "multichoice" && (
                  <div className="multichoice-input-plo">
                    <select className="multichoice-select-plo">
                      {field.list.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <div className="multichoice-options-plo">
                      <input
                        type="text"
                        onChange={(e) => setTextField(e.target.value)}
                        value={textField}
                        placeholder="Add an option"
                        className="multichoice-option-input-plo"
                      />
                      <button
                        className="multichoice-add-button-plo"
                        onClick={() => addFieldOption(field.name, textField)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className="add-question-buttons-plo">
          <button onClick={() => addQuestion()}>
            <PlusCircleIcon className="plus-icon-plo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manageplo;
