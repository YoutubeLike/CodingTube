export default function Card({ descriptionText, image, descriptionImage }) {
  return (
    <div className="item-card h-64 w-80 p-3">
      <div className="card-background flex justify-center">
        <img
          className="bgCard"
          src={image}
          alt={descriptionImage}
          width={264 + 'px'}
          height={100 + 'px'}
        />
      </div>
      <div className="card-description">
        <p className="description-text text-[#F1F1F1] text-center">
          {descriptionText}
        </p>
      </div>
    </div>
  );
}
