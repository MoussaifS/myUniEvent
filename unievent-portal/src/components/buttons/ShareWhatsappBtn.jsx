import "@material/web/iconbutton/filled-tonal-icon-button.js";
import "@material/web/icon/icon.js";
import ShareIcon from "../../assets/share_icon.svg";

const ShareWhatsappBtn = (props) => {
  const handleShare = () => {
    console.log('in')
    const message =
      `🌟 *Event Alert! Join us for "${props.event.title}" at ${props.uni}* 🌟%0a%0a` +
      `📅 *Date:* ${props.event.startDate}%0a` +
      `🕒 *Time:* ${props.event.startTime}%0a%0a` +
      `📝 *Description:* "${props.event.description}"%0a%0a` +
      `📍 *Audience:* ${props.event.audience}%0a` +
      `🎟️ *Fees:* ${ parseInt(props.event.fees) < 1 ? "For free" : props.event.fees}rm%0a` +
      // `📞 *Contact ${props.user.lastName}:* ${props.user.phone}%0a%0a` +
      `For more details or to register, contact us at the provided number! 📲`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <button id="whatsapp-btn" onClick={() => handleShare()}>
      <md-icon>
        <img src={ShareIcon} alt="Share" />
      </md-icon>
    </button>
  );
};

export default ShareWhatsappBtn;
