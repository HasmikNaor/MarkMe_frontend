import { useEffect, useState } from "react";
import { api } from "./utils/api";
import TemplateList from "./components/TemplateList/TemplateList";
import { ITemplate } from "./utils/interfaces";
import NewTemplateForm from "./components/NewTemplateForm/NewTemplateForm";

function App() {
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [operationFeedback, setOperationFeedback] = useState("");
  const [template, setTemplate] = useState<ITemplate>({
    _id: "",
    name: "",
    content: "",
  });

  const fetchAllTemplates = () => {
    api
      .getAllTemplate()
      .then((res) => {
        setTemplates(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (template: ITemplate) => {
    api
      .deleteTemplate(template._id)
      .then((res) => {
        setOperationFeedback(res.message);
        setTemplate({ _id: "", name: "", content: "" });
        fetchAllTemplates();
      })
      .catch((err) => {
        setOperationFeedback(err.message || err);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllTemplates();
  }, []);

  return (
    <div className="App">
      <main className="main">
        <NewTemplateForm
          fetchAllTemplates={fetchAllTemplates}
          setTemplate={setTemplate}
          template={template}
          operationFeedback={operationFeedback}
          setOperationFeedback={setOperationFeedback}
        />
        {templates.length > 0 ? (
          <TemplateList
            onDelete={handleDelete}
            setTemplate={setTemplate}
            templateList={templates}
          />
        ) : (
          <p>there are no templates to diplay</p>
        )}
      </main>
    </div>
  );
}

export default App;
