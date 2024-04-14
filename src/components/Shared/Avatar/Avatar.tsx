import './Avatar.css';

interface AvatarProps {
    user: { imgUrl?: string, name?: string };
    size: "md" | "sm";
}

const Avatar = (props: AvatarProps) => {
    return (
        <>
            <img
                src={props.user.imgUrl}
                alt={props.user.name}
                className={`user-avatar user-avatar-${props.size}`} />
        </>
    )
}

export default Avatar;