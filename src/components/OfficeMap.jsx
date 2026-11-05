const embed =
  "https://maps.google.com/maps?q=Driftmates%20Adventure%2C%20Krishna%20Colony%2C%20Dahariya%20Road%2C%20near%20Government%20ITI%2C%20Haldwani&z=16&output=embed";
const href =
  "https://www.google.com/maps/place/Driftmates+Adventure/@29.2066151,79.5104874,17z";

export default function OfficeMap() {
  return (
    <div className="desk-map">
      <iframe
        title="Google Map of the Driftmates office in Haldwani"
        src={embed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a href={href} target="_blank" rel="noreferrer">
        Open in Google Maps
      </a>
    </div>
  );
}
