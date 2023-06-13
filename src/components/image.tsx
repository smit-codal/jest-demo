import { useEffect, useState } from "react";

type ImageProps = {
  src: string | undefined;
  alt: string;
};

export default function Image(props: ImageProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!Boolean(props.src));
  }, [props.src]);

  return loading ? <>Loading...</> : <img src={props.src} alt={props.alt} />;
}
