import clsx from 'clsx';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      aria-label={`${process.env.SITE_NAME} logo`}
      className={clsx('h-4 w-4 fill-black dark:fill-white', props.className)}
      viewBox="0 0 1200 1200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1200" height="1200" rx="48" fill="url(#paint0_linear_387_29)" />
      <path
        d="M257.938 744.664C202.642 744.664 161.39 724.037 161.39 693.317C161.39 673.569 174.994 665.23 192.548 665.23C236.873 665.23 221.513 725.354 257.938 725.354C271.104 725.354 281.636 718.771 281.636 701.217C281.636 643.726 165.339 677.518 165.339 592.38C165.339 553.322 203.081 525.674 257.938 525.674C313.673 525.674 350.537 549.811 350.537 578.337C350.537 593.697 337.371 605.107 320.695 605.107C278.564 605.107 292.169 545.861 261.888 545.861C248.283 545.861 241.7 558.149 241.7 570.876C241.7 631 354.048 599.402 354.048 680.152C354.048 716.577 318.939 744.664 257.938 744.664ZM540.247 740.714C534.542 740.714 530.592 737.203 530.592 731.937V730.62C530.592 718.332 546.83 714.821 539.369 703.85L501.188 645.921L479.246 666.547V692.878C479.246 713.066 498.555 717.893 498.555 730.62V732.376C498.555 737.642 494.167 740.714 488.023 740.714H393.23C387.086 740.714 383.136 737.642 383.136 732.376V730.62C383.136 717.893 400.251 713.066 400.251 692.878V492.321C400.251 471.694 379.186 465.989 379.186 455.018V453.262C379.186 448.435 383.136 446.241 389.28 443.169L459.058 410.693C471.346 404.988 479.246 412.01 479.246 419.909V627.928L538.491 577.459C551.657 566.049 527.081 552.444 527.081 540.595V538.84C527.081 533.573 531.47 530.062 537.175 530.062H606.514C612.658 530.062 616.608 533.134 616.608 538.401V540.156C616.608 552.444 592.91 560.782 575.355 577.02L547.268 602.913L617.924 703.85C624.507 713.505 642.939 718.332 642.939 730.62V732.376C642.939 737.642 638.551 740.714 632.846 740.714H540.247ZM669.528 740.714C663.384 740.714 658.995 737.642 658.995 732.376V730.62C658.995 717.893 676.55 712.627 676.55 692.44V609.057C676.55 588.869 658.995 582.725 658.995 572.193V570.437C658.995 565.61 662.945 563.416 669.089 560.344L735.356 527.868C747.644 521.724 755.105 528.746 755.105 537.084V692.44C755.105 712.627 774.854 717.893 774.854 730.62V732.376C774.854 737.642 770.465 740.714 764.321 740.714H669.528ZM666.017 460.284C666.017 435.269 686.204 416.398 716.486 416.398C746.328 416.398 766.515 435.269 766.515 460.284C766.515 484.86 746.328 504.17 716.486 504.17C686.204 504.17 666.017 484.86 666.017 460.284ZM922.111 745.102C854.966 745.102 800.547 698.584 800.547 634.949C800.547 569.998 856.282 525.674 919.478 525.674C985.306 525.674 1039.72 571.315 1039.72 635.827C1039.72 699.9 986.623 745.102 922.111 745.102ZM878.225 602.035C878.225 637.582 896.218 723.598 931.766 723.598C951.953 723.598 959.414 702.533 959.414 669.619C959.414 635.388 941.859 547.178 907.19 547.178C885.686 547.178 878.225 566.488 878.225 602.035Z"
        fill="#F8F0FF"
      />
      <defs>
        <linearGradient
          id="paint0_linear_387_29"
          x1="-1.45626e-05"
          y1="267.429"
          x2="1200"
          y2="1138.29"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.075" stop-color="#170127" />
          <stop offset="0.28" stop-color="#421751" />
          <stop offset="0.43" stop-color="#53265C" />
          <stop offset="0.895" stop-color="#A46796" />
        </linearGradient>
      </defs>
    </svg>
  );
}