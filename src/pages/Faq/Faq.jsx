import faqImage from "../../assets/images/faq.png";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Container from "../../components/Shared/Container";

const Faq = () => {
    return (
        <Container>
            <div className="py-5">
            <SectionTitle
                heading={"Frequently asked questions"}
                subHeading={"Your Queries Answered"}
            />
            <div className="flex flex-col md:flex-row gap-5">
                <div className="md:w-1/2">
                    <div className="flex flex-col py-5">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left font-bold text-lg border-b">Question</th>
                                    <th className="px-4 py-2 text-left font-bold text-lg border-b">Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 font-semibold">How do I register for a medical camp?</td>
                                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400">
                                        Registration for our medical camps can be done through our website. Simply visit the event page of the camp you're interested in and follow the registration instructions provided there.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold">Are these medical camps free of charge?</td>
                                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400">
                                        Yes, all our medical camps are free for participants. We believe in providing accessible healthcare services to all members of the community without any financial barriers.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold">Can I volunteer at the medical camps?</td>
                                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400">
                                        Absolutely! We welcome volunteers who are passionate about contributing to community health. You can find volunteer opportunities listed on the respective event pages or reach out to us directly for more information on how to get involved.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-end">
                    <img className="w-[400px] hidden md:block" src={faqImage} alt="FAQ illustration" />
                </div>
            </div>
        </div>
        </Container>
    );
};

export default Faq;



