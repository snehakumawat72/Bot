import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000'; 

function Cards(props) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await fetch(`${API_BASE_URL}/save-interview-selection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: props.email,
          interviewType: props.title
        })
      });
    } catch (error) {
      console.error('Error saving selection:', error);
    }

    navigate(props.path);
  };

  return (
    <Card style={{ width: '23rem', height: '23rem', display: 'flex', flexDirection: 'column' }}>
      <Card.Img
        variant="top"
        src={props.src}
        style={{ objectFit: 'contain', height: '200px' }}
      />
      <Card.Body style={{ overflow: 'auto' }}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
        <Button
          variant="primary"
          style={{ height: '85px', width: '310px', fontSize: '1.5rem' }}
          onClick={handleClick}
        >
          {props.name}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Cards;
