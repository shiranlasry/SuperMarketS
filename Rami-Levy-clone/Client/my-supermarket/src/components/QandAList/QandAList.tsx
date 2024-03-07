import { qAndAList } from '../../constants/QandAConst';
import QandA from '../QandA/QandA';

const QandAList = () => {
    return (
        <div>
            {qAndAList.map((item) => (
                <QandA key={item.qId} qAndA={{ qId: item.qId, q: item.q, a: item.a }} />
            ))}
        </div>
    );
};

export default QandAList;
