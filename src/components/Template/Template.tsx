import { ITemplate } from "../../utils/interfaces";

interface TeplateProps {
  template: ITemplate;
  onUpdate: (template: ITemplate) => void;
  onDelete: (template: ITemplate) => void;
}

const Template = ({ template, onUpdate, onDelete }: TeplateProps) => {
  const { _id, name, content } = template;

  const onUpdateClick = () => {
    onUpdate(template);
  };

  const deleteTemplate = () => {
    onDelete(template);
  };

  return (
    <li className="template" key={_id}>
      <button
        type="button"
        className="template__btn template__btn_type_delete"
        onClick={deleteTemplate}
      >
        delete
      </button>
      <button
        type="button"
        className="template__btn template__btn_type_update"
        onClick={onUpdateClick}
      >
        update
      </button>
      <div className="template__main">
        <h2 className="template__name">{name}</h2>
        <p className="template__content">{content}</p>
      </div>
    </li>
  );
};

export default Template;
