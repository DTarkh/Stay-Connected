interface Data {
    title: string;
    author: string;
    question: string;
    tags: string[];
    date: number;
  }
  
  interface QuestionProps {
    data: Data[];
  }
  
  const Question = ({ data }: QuestionProps) => {
    return (
      <>
        {data.map((item, index) => (
          <div
            key={index}
            className="max-sm:w-[450px] w-[600px] border-2 border-current h-40 rounded-2xl px-5 flex flex-col justify-between py-3"
          >
            <div className="flex justify-between">
              <h2 className="font-bold text-lg hover:cursor-pointer hover:underline hover:text-blue-600">Question Title: {item.title}</h2>
              <p className="text-gray-500">By {item.author}</p>
            </div>
            <p>{item.question}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 ">
                {item.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-200 text-sm text-gray-700 rounded-full px-2 hover:cursor-pointer  hover:bg-blue-500 hover:text-white "
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm text-gray-500">
                <p>Answers: X</p>
                <p>{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };
  
  export default Question;