import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import * as S from "./Category.style";

export default function CategorySkeleton() {
  const [categoryCnt, setCategoryCnt] = useState(3);
  const isPc = useMediaQuery({ maxWidth: 820 });

  useEffect(() => {
    if (isPc) {
      setCategoryCnt(1);
    }
  }, []);
  const skeleton = [];
  for (let i = 0; i < categoryCnt; i++) {
    skeleton.push(
      <S.SkeletonContainer>
        <S.SkeletonTitle isPc={isPc} />
        <S.SkeletonImg isPc={isPc} />
      </S.SkeletonContainer>
    );
  }

  return <S.SkeletonWrapper>{skeleton}</S.SkeletonWrapper>;
}
