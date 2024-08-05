export const getRedirectURL = (
  productClientId: string,
  productRedirectUri: string,
  organizationId: string,
  env: 'production' | 'prod' | string | undefined
): string => {
  let domain = '';
  if (env && domain !== 'production' && domain !== 'prod') {
    domain += `https://accounts.${env}.livechat.com`;
  } else {
    domain += 'https://accounts.livechat.com';
  }

  return `${domain}/signin?client_id=${productClientId}&redirect_uri=${encodeURIComponent(
    productRedirectUri
  )}&response_type=token&organization_id=${organizationId}`;
};
export const getTrialDaysLeft = (trialEnd: string): number => {
  const trialEndDate = new Date(trialEnd);
  const currentDate = new Date();
  const diffTime = trialEndDate.getTime() - currentDate.getTime();

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
