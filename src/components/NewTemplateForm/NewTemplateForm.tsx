import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { ITemplate } from "../../utils/interfaces";

interface INewTemplateForm {
  fetchAllTemplates: () => void;
  setTemplate: React.Dispatch<React.SetStateAction<ITemplate>>;
  template: ITemplate;
  setOperationFeedback: React.Dispatch<React.SetStateAction<string>>;
  operationFeedback: string;
}
const NewTemplateForm = ({
  fetchAllTemplates,
  template,
  setTemplate,
  setOperationFeedback,
  operationFeedback,
}: INewTemplateForm) => {
  const isBtnDisabled = !!(template.name.trim() && template.content.trim());

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setTemplate((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const clearFields = () => {
    setTemplate({
      _id: "",
      name: "",
      content: "",
    });
  };

  const updateTemplate = (id: string) => {
    api
      .updateTemplate(id, {
        name: template.name,
        content: template.content,
      })
      .then((res) => {
        console.log(res);
        setOperationFeedback(res.message);
        fetchAllTemplates();
      })
      .catch((err) => {
        setOperationFeedback(err.message || err);
        console.log(err);
      });
  };

  const createTemplate = () => {
    api
      .createTemplate({ name: template.name, content: template.content })
      .then((res) => {
        setOperationFeedback(res.message);
        fetchAllTemplates();
      })
      .catch((err) => {
        console.log(err);
        setOperationFeedback(err.message || err);
      });
  };

  const submitTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (template._id) {
      updateTemplate(template._id);
    } else {
      createTemplate();
    }
    clearFields();
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setTemplate((prev) => ({
      ...prev,
      content: value,
    }));
  };

  return (
    <form className="new-template-form" onSubmit={submitTemplate}>
      <h2 className="new-template-form__title">add template</h2>
      <span className="new-template-form__subtitle">{operationFeedback}</span>
      <input
        type="text"
        value={template.name}
        onChange={changeName}
        className="new-template-form__name"
        placeholder="name"
      />
      <textarea
        rows={5}
        cols={50}
        className="new-template-form__content"
        value={template.content}
        placeholder="add content"
        onChange={changeContent}
      ></textarea>
      <button className="new-template-form__btn" disabled={!isBtnDisabled}>
        {" "}
        {template._id ? "update" : "add"}
      </button>
    </form>
  );
};

export default NewTemplateForm;
