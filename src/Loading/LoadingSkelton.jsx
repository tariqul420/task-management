import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingSkeleton = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} style={{ width: 'calc(50% - 8px)' }}>
                    <Skeleton height={100} borderRadius={8} />
                </div>
            ))}
        </div>
    );
};

export default LoadingSkeleton;