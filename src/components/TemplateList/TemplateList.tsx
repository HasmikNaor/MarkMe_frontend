import { ITemplate } from "../../utils/interfaces";
import Template from "../Template/Template";
interface ITemplateList {
  templateList: ITemplate[];
  onDelete: (template: ITemplate) => void;
  setTemplate: React.Dispatch<React.SetStateAction<ITemplate>>;
}

const TemplateList = ({
  templateList,
  setTemplate,
  onDelete,
}: ITemplateList) => {
  const handleUpdate = (template: ITemplate) => {
    setTemplate(template);
  };

  return (
    <ul className="template-list">
      <h1 className="template-list__title">My Templates</h1>
      {templateList.map((template) => (
        <Template
          template={template}
          onUpdate={handleUpdate}
          onDelete={onDelete}
          key={template._id}
        />
      ))}
    </ul>
  );
};

export default TemplateList;
