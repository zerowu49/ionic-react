import './Title.css';

interface ContainerProps {
  name: string;
}

const Title: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className='container'>
      <strong>{name}</strong>
    </div>
  );
};

export default Title;
