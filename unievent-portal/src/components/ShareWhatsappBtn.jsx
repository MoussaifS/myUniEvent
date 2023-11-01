const ShareWhatsappBtn = (props) => {
  const handleShare = () => {
    const message = `*Hey there!* %F0%9F%93%A2%0A%0AYou're invited to join the following event:%0A%0A%F0%9F%93%85+*Date:* ${encodeURIComponent(
      props.event.startDate
    )}%0A%F0%9F%95%B0+*Time:* ${encodeURIComponent(
      props.event.startTime
    )}%0A%F0%9F%8F%B3%EF%B8%8F+*Duration:* ${encodeURIComponent()} hours%0A%F0%9F%93%8D+*Location:* ${encodeURIComponent(
      props.uni
    )}%0A%0A%F0%9F%93%8C+*Event Details:*%0A*Name:* ${encodeURIComponent(
      props.event.title
    )}%0A*Description:* ${encodeURIComponent(
      props.event.description
    )}%0A*Tags:* ${encodeURIComponent(
      props.event.tags.map((tag) => tag.label).join(", ")
    )}%0A%0A%F0%9F%91%A5+*Organized by:* ${encodeURIComponent(
      props.club.length > 0 ? props.club : props.uni
    )}%0A%0AWe hope to see you there! %F0%9F%98%84`;

    // Use encodeURIComponent(message) when passing the message to the WhatsApp invitation function or component.

    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <button size="small" onClick={handleShare}>
      Share
    </button>
  );
};

export default ShareWhatsappBtn;
